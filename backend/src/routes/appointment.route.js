import express from 'express';
import { createAppointment, updateAppointment, getAppointmentDetails, getRecentAppointmentList } from '../controllers/appointment.controller.js';

const router = express.Router();

router.get('/admin/getRecentAppointments', getRecentAppointmentList);

router.get('/:appointmentId', getAppointmentDetails);

router.post('/create', createAppointment);

router.put('/update', updateAppointment);


export default router;