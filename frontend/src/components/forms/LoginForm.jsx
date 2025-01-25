import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { PatientLoginFormValidation } from '@/lib/validation'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/lib/axios'
import toast from 'react-hot-toast'

const LoginForm = ({ user }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(PatientLoginFormValidation),
        defaultValues: {
            name: "",
            email: "",
        },
    })

    async function onSubmit({name, email}) {
        setIsLoading(true);

        try {
            const patientData = {
                name, email
            }

            const res = await axiosInstance.post(`/patients/login`, patientData)

            const patient = res.data.patient;

            if (patient) {
                navigate(`/patients/${user._id}/new-appointment`)
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
                <section className='space-y-4'>
                    <h1 className='header'>Welcome back 👋</h1>
                    <div>
                        <p className='text-dark-700'>Please login to continue</p>
                        <p className='text-dark-700 text-sm mt-1'>Not a registered patient?
                            <Link to={`/patients/${user._id}/register`} className='text-white mx-1 text-sm underline' >Register </Link>to continue
                        </p>
                    </div>
                </section>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='name'
                        label='Full name'
                        placeholder='John Doe'
                        iconSrc='/assets/icons/user.svg'
                        iconAlt='user'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='email'
                        label='Email'
                        placeholder='johndoe@gmail.com'
                        iconSrc='/assets/icons/email.svg'
                        iconAlt='email'
                    />
                </div>

                <SubmitButton isLoading={isLoading} >Submit</SubmitButton>
            </form>
        </Form>
    )
}

export default LoginForm
