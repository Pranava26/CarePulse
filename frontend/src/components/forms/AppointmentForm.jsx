import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { getAppointmentSchema } from '@/lib/validation'
import { useNavigate } from 'react-router-dom'
import { Doctors } from '@/constants'
import { SelectItem } from '../ui/select'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'

const AppointmentForm = ({ userId, patientId, type, appointment, setOpen }) => {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const AppointmentFormValidation = getAppointmentSchema(type);

    const form = useForm({
        resolver: zodResolver(AppointmentFormValidation),
        defaultValues: {
            primaryPhysician: appointment ? appointment.primaryPhysician : '',
            schedule: appointment ? new Date(appointment.schedule) : new Date(Date.now()),
            reason: appointment ? appointment.reason : '',
            note: appointment?.note || '',
            cancellationReason: appointment?.cancellationReason || ''
        },
    })

    let buttonLabel;
    switch (type) {
        case "cancel":
            buttonLabel = "Cancel Appointment";
            break;
        case "schedule":
            buttonLabel = "Schedule Appointment";
            break;
        default:
            buttonLabel = "Submit Apppointment";
    }

    async function onSubmit(values) {
        setIsLoading(true);

        let status;
        switch (type) {
            case 'schedule':
                status = 'scheduled'
                break;
            case 'cancel':
                status = 'cancelled'
                break;
            default:
                status = 'pending'
                break;
        }

        try {
            if (type === 'create' && patientId) {

                const appointmentData = {
                    userId,
                    patientId,
                    primaryPhysician: values.primaryPhysician,
                    schedule: new Date(values.schedule),
                    reason: values.reason,
                    note: values.note,
                    status
                }

                const res = await axiosInstance.post('/appointment/create', appointmentData);

                const appointment = res.data.newAppointment;

                if (appointment) {
                    form.reset();
                    navigate(`/patients/${userId}/new-appointment/success?appointmentId=${appointment._id}`)
                }
            } else {
                const appointmentToUpdate = {
                    userId,
                    appointmentId: appointment._id,
                    appointment: {
                        primaryPhysician: values?.primaryPhysician,
                        schedule: new Date(values?.schedule),
                        status: status,
                        cancellationReason: values?.cancellationReason
                    },
                    type
                }

                const updatedAppointment = await axiosInstance.put('/appointment/update', appointmentToUpdate);

                if (updatedAppointment) {
                    setOpen && setOpen(false);
                    form.reset();
                }
            }

        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
                {type === 'create' && <section className='mb-12 space-y-4'>
                    <h1 className='header'>New Appointment</h1>
                    <p className='text-dark-700'>Request a new appointment in 10 seconds</p>
                </section>}

                {type !== 'cancel' && (
                    <>
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            control={form.control}
                            name='primaryPhysician'
                            label='Doctor'
                            placeholder='Select a doctor'
                        >
                            {Doctors.map((doctor) => (
                                <SelectItem key={doctor.name} value={doctor.name}>
                                    <div className='flex cursor-pointer items-center gap-2'>
                                        <img src={doctor.image} width={32} height={32} alt={doctor.name} className='rounded-full border border-dark-500' />
                                        <p>{doctor.name}</p>
                                    </div>
                                </SelectItem>
                            ))}
                        </CustomFormField>

                        <CustomFormField
                            fieldType={FormFieldType.DATE_PICKER}
                            control={form.control}
                            name='schedule'
                            label='Expected appointment date'
                            showTimeSelect
                            dateFormat='MM/dd/yyyy - h:mm aa'
                        />

                        <div className='flex flex-col gap-6 xl:flex-row'>
                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name='reason'
                                label='Reason for appointment'
                                placeholder='Enter a reason for appointment'
                            />

                            <CustomFormField
                                fieldType={FormFieldType.TEXTAREA}
                                control={form.control}
                                name='note'
                                label='Notes'
                                placeholder='Enter notes'
                            />
                        </div>
                    </>
                )}

                {type === 'cancel' && (
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='cancellationReason'
                        label='Reason for cancellation'
                        placeholder='Enter reason for cancellation'
                    />
                )}

                <SubmitButton isLoading={isLoading} className={`${type === 'cancel' ? 'shad-danger-btn' : 'shad-primary-btn'} w-full`} >
                    {buttonLabel}
                </SubmitButton>
            </form>
        </Form>
    )
}

export default AppointmentForm
