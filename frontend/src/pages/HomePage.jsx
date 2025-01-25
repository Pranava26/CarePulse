import React from 'react'
import PatientForm from '../components/forms/PatientForm'
import { Link, useLocation } from 'react-router-dom'
import PasskeyModal from '@/components/PasskeyModal';

const HomePage = () => {
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const isAdmin = queryParams.get('admin');

    return (
        <div className='flex h-screen max-h-screen'>

            {isAdmin && <PasskeyModal />}

            <section className='remove-scrollbar container my-auto'>
                <div className='sub-container max-w-[496px]'>
                    <img src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className='mb-12 h-10 w-fit' />

                    <PatientForm />

                    <div className='text-14-regular mt-20 flex justify-between'>
                        <p className='justify-items-end text-dark-600 xl:text-left'>© 2025 CarePulse</p>
                        <Link to='/?admin=true' className='text-green-500' >Admin</Link>
                    </div>
                </div>
            </section>

            <img src="/assets/images/onboarding-img.png" height={1000} width={1000} alt="patient" className='side-img max-w-[50%]' />
        </div>
    )
}

export default HomePage
