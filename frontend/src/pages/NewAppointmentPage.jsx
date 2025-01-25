import React, { useEffect, useState } from 'react'
import AppointmentForm from '@/components/forms/AppointmentForm'
import { useAuthStore } from '@/store/useAuthStore'
import { axiosInstance } from '@/lib/axios';
import toast from 'react-hot-toast';

const NewAppointmentPage = () => {
  const [patient, setPatient] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = useAuthStore();

  async function getPatient() {
    setIsLoading(true);

    try {
      const res = await axiosInstance.get(`/patients/${authUser._id}`);
      setPatient(res.data.patient);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPatient();
  }, []);

  if (isLoading) {
    <div className='flex items-center justify-center h-screen'>
      <p className='text-white'>Loading...</p>
    </div>
  }

  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <div className='sub-container max-w-[860px] flex-1 justify-between'>
          <img src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className='mb-12 h-10 w-fit' />

          <AppointmentForm type="create" userId={authUser._id} patientId={patient._id} />

          <p className='copyright mt-10 py-12'>© 2025 CarePulse</p>
        </div>
      </section>

      <img src="/assets/images/appointment-img.png" height={1000} width={1000} alt="appointment" className='side-img max-w-[390px] bg-bottom' />
    </div>
  )
}

export default NewAppointmentPage
