import React, { useState } from 'react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Form, FormControl } from "@/components/ui/form"
import CustomFormField, { FormFieldType } from '../CustomFormField'
import SubmitButton from '../SubmitButton'
import { PatientFormValidation } from '@/lib/validation'
import { Link, useNavigate } from 'react-router-dom'
import { axiosInstance } from '@/lib/axios'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants'
import { Label } from '../ui/label'
import { SelectItem } from '../ui/select'
import toast from 'react-hot-toast'

const RegisterForm = ({ user }) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm({
        resolver: zodResolver(PatientFormValidation),
        defaultValues: {
            ...PatientFormDefaultValues,
            name: "",
            email: "",
            phone: ""
        },
    })

    async function onSubmit(values) {
        setIsLoading(true);

        try {
            const patientData = {
                ...values,
                userId: user._id,
                birthDate: new Date(values.birthDate)
            }

            const res = await axiosInstance.post(`/patients/register`, patientData)

            const newPatient = res.data.newPatient;

            if (newPatient) {
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
                    <h1 className='header'>Welcome 👋</h1>
                    <div>
                        <p className='text-dark-700'>Let us know more about yourself</p>
                        <p className='text-dark-700 text-sm mt-1'>Already a registered patient? 
                            <Link to={`/patients/${user._id}/login`} className='text-white mx-1 text-sm underline' >Login </Link>to continue
                        </p>
                    </div>
                </section>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Personal Information</h2>
                    </div>
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

                <div className='flex flex-col gap-6 xl:flex-row'>
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
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.DATE_PICKER}
                        control={form.control}
                        name='birthDate'
                        label='Date of Birth'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.SKELETON}
                        control={form.control}
                        name='gender'
                        label='Gender'
                        renderSkeleton={(field) => (
                            <FormControl >
                                <RadioGroup className='flex h-11 gap-6 xl:justify-between' onValueChange={field.onChange} defaultValue={field.value} >
                                    {GenderOptions.map((option) => (
                                        <div key={option} className='radio-group'>
                                            <RadioGroupItem value={option} id={option} />
                                            <Label htmlFor={option} className='cursor-pointer' >{option}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        )}
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='address'
                        label='Address'
                        placeholder='Sector 45, Delhi'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='occupation'
                        label='Occupation'
                        placeholder='Software Engineer'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='emergencyContactName'
                        label='Emergency contact name'
                        placeholder="Guardian's name"
                    />

                    <CustomFormField
                        fieldType={FormFieldType.PHONE_INPUT}
                        control={form.control}
                        name='emergencyContactNumber'
                        label='Emergency contact number'
                        placeholder='(+91) 9955887616'
                    />
                </div>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Medical Information</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name='primaryPhysician'
                    label='Primary physician'
                    placeholder='Select a physician'
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

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='insuranceProvider'
                        label='Insurance provider'
                        placeholder='ICICI Lombard'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        control={form.control}
                        name='insurancePolicyNumber'
                        label='Insurance policy number'
                        placeholder='ABC123456789'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='allergies'
                        label='Allergies (if any)'
                        placeholder='Peanuts, Penicillin, Pollen'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='currentMedication'
                        label='Current medication (if any)'
                        placeholder='Ibuprofen 200mg, Paracetamol 500mg'
                    />
                </div>

                <div className='flex flex-col gap-6 xl:flex-row'>
                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='familyMedicalHistory'
                        label='Family medical history'
                        placeholder='Mother/Father had [xyz] disease'
                    />

                    <CustomFormField
                        fieldType={FormFieldType.TEXTAREA}
                        control={form.control}
                        name='pastMedicalHistory'
                        label='Past medical history'
                        placeholder='Appendectomy in 2015, Asthma diagnosis in childhood'
                    />
                </div>

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Identification and Verification</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name='identificationType'
                    label='Identification type'
                    placeholder='Select an identification type'
                >
                    {IdentificationTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                            {type}
                        </SelectItem>
                    ))}
                </CustomFormField>

                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name='identificationNumber'
                    label='Identification number'
                    placeholder='123456789'
                />

                <section className='space-y-6'>
                    <div className='mb-9 space-y-1'>
                        <h2 className='sub-header'>Consent and Privacy</h2>
                    </div>
                </section>

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='treatmentConsent'
                    label='I consent to treatment'
                />

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='disclosureConsent'
                    label='I consent to disclosure of information'
                />

                <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name='privacyConsent'
                    label='I consent to privacy policy'
                />

                <SubmitButton isLoading={isLoading} >Get Started</SubmitButton>
            </form>
        </Form>
    )
}

export default RegisterForm
