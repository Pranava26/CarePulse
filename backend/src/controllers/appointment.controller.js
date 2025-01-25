import { formatDateTime } from "../lib/utils.js";
import Appointment from "../models/appointment.model.js";
import User from "../models/user.model.js";
import twilio from 'twilio';

export const createAppointment = async (req, res) => {
    try {
        const { userId, patientId, primaryPhysician, schedule, reason, status, note } = req.body;

        const newAppointment = await Appointment.create({
            userId, patientId, primaryPhysician, schedule, reason, status, note
        })

        if (newAppointment) {
            res.status(201).json({ newAppointment });
        } else {
            res.status(400).json({ message: "Failed to create new appointment" });
        }

    } catch (error) {
        console.log("Error in createAppointment controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAppointmentDetails = async (req, res) => {
    try {
        const { appointmentId } = req.params;

        const appointment = await Appointment.findById(appointmentId);

        if (appointment) {
            res.status(200).json({ appointment });
        } else {
            res.status(400).json({ message: 'Invalid appointment ID' });
        }

    } catch (error) {
        console.log("Error in getAppointmentDetails controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getRecentAppointmentList = async (req, res) => {
    try {
        const appointments = await Appointment.find({}).sort({ createdAt: -1 }).populate('patientId', 'name');

        const initialCounts = {
            scheduledCount: 0,
            pendingCount: 0,
            cancelledCount: 0
        };

        const counts = appointments.reduce((acc, appointment) => {
            if (appointment.status === 'scheduled') {
                acc.scheduledCount += 1;
            } else if (appointment.status === 'pending') {
                acc.pendingCount += 1;
            } else if (appointment.status === 'cancelled') {
                acc.cancelledCount += 1;
            }

            return acc;
        }, initialCounts);

        const data = {
            totalCount: appointments.length,
            ...counts,
            documents: appointments
        }

        return res.status(200).json(data);

    } catch (error) {
        console.log("Error in getRecentAppointmentList controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateAppointment = async (req, res) => {
    try {
        const { appointmentId, userId, appointment, type, timeZone } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(appointmentId, appointment, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        const smsMessage = `Greetings from CarePulse. ${type === "schedule"
            ? `Your appointment is confirmed for ${formatDateTime(appointment.schedule, timeZone).dateTime} with Dr. ${appointment.primaryPhysician}`
            : `We regret to inform that your appointment for ${formatDateTime(appointment.schedule, timeZone).dateTime} is cancelled. Reason: ${appointment.cancellationReason}`}.`;

        await sendSMSNotification(userId, smsMessage);

        res.status(200).json(updatedAppointment);

    } catch (error) {
        console.log("Error in updateAppointment controller", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

const sendSMSNotification = async (userId, content) => {
    try {
        const user = await User.findById(userId);
        if (!user || !user.phone) {
            throw new Error('User phone number not found');
        }

        const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

        await twilioClient.messages.create({
            body: content,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone
        });

        return true;
    } catch (error) {
        console.error("An error occurred while sending SMS:", error);
        throw error;
    }
};