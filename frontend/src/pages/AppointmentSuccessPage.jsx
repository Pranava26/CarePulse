import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { axiosInstance } from '@/lib/axios';
import { formatDateTime } from '@/lib/utils';
import { useAuthStore } from '@/store/useAuthStore';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const AppointmentSuccessPage = () => {
    const location = useLocation();
    const [appointment, setAppointment] = useState({});

    const { authUser } = useAuthStore();

    const queryParams = new URLSearchParams(location.search);
    const appointmentId = queryParams.get('appointmentId');

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician);

    async function getAppointment() {
        try {
            const res = await axiosInstance.get(`/appointment/${appointmentId}`);
            setAppointment(res.data.appointment)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointment();
    }, [appointmentId])

    return (
        <div className='flex h-screen max-h-screen px-[5%]'>
            <div className='success-img'>
                <Link to='/' >
                    <img src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="logo" className='h-10 w-fit' />
                </Link>

                <section className='flex flex-col items-center'>
                    <img src="/assets/gifs/success.gif" height={300} width={280} alt="success" />
                    <h2 className='header mb-6 max-w-[600px] text-center'>
                        Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
                    </h2>
                    <p>We'll be in touch shortly to confirm.</p>
                </section>

                <section className='request-details'>
                    <p>Requested appointment details:</p>
                    <div className='flex items-center gap-3'>
                        <img src={doctor?.image} alt="doctor" width={100} height={100} className='size-6' />
                        <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                    </div>
                    <div className='flex gap-2'>
                        <img src="/assets/icons/calendar.svg" height={24} width={24} alt="calendar" />
                        <p>{formatDateTime(appointment?.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant='outline' className='shad-primary-btn' asChild>
                    <Link to={`/patients/${authUser._id}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>

                <p className='copyright'>© 2025 CarePulse</p>
            </div>
        </div>
    )
}

export default AppointmentSuccessPage
