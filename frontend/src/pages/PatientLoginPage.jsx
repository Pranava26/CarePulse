import LoginForm from '@/components/forms/LoginForm';
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'

const PatientLoginPage = () => {

    const { authUser } = useAuthStore();

    return (
        <div className='flex h-screen max-h-screen'>
            <section className='remove-scrollbar container'>
                <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
                    <img src="/assets/icons/logo-full.svg" height={1000} width={1000} alt="patient" className='mb-12 h-10 w-fit' />

                    <LoginForm user={authUser} />

                    <p className='copyright py-12'>© 2025 CarePulse</p>
                </div>
            </section>

            <img src="/assets/images/register-img.png" height={1000} width={1000} alt="patient" className='side-img max-w-[390px]' />
        </div>
    )
}

export default PatientLoginPage