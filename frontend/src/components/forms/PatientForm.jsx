import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { UserFormValidation } from '@/lib/validation'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'
import toast from 'react-hot-toast'

const PatientForm = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const { signup, authUser } = useAuthStore();

    const form = useForm({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: "",
            email: "",
            phone: ""
        },
    })

    async function onSubmit({ name, email, phone }) {
        setIsLoading(true);

        try {
            const userData = { name, email, phone };

            await signup(userData);

            const updatedAuthUser = useAuthStore.getState().authUser;

            if(updatedAuthUser){
                navigate(`/patients/${updatedAuthUser._id}/register`);
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
                <section className='mb-12 space-y-4'>
                    <h1 className='header'>Hi there 👋</h1>
                    <p className='text-dark-700'>Schedule your first appointment</p>
                </section>

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

                <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name='phone'
                    label='Phone number'
                    placeholder='(+91) 9955887616'
                />

                <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default PatientForm
