import StatCard from '@/components/StatCard'
import { axiosInstance } from '@/lib/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { columns } from '@/components/table/Columns';
import { DataTable } from '@/components/table/DataTable';
import toast from 'react-hot-toast';

const AdminPage = () => {

    const [appointments, setAppointments] = useState({
        scheduledCount: 0,
        pendingCount: 0,
        cancelledCount: 0,
        documents: [],
    });

    const [isLoading, setIsLoading] = useState(false);

    async function getRecentAppointments() {
        setIsLoading(true);

        try {
            const res = await axiosInstance.get('/appointment/admin/getRecentAppointments');
            setAppointments(res.data);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getRecentAppointments();
    }, [appointments])

    if (isLoading) {
        <div className='flex items-center justify-center h-screen'>
            <p className='text-white'>Loading...</p>
        </div>
    }

    return (
        <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
            <header className='admin-header'>
                <Link to='/' className='cursor-pointer'>
                    <img src="/assets/icons/logo-full.svg" height={32} width={162} alt="logo" className='h-8 w-fit' />
                </Link>
                <p className='text-16-semibold'>Admin Dashboard</p>
            </header>

            <main className='admin-main'>
                <section className='w-full space-y-4'>
                    <h1 className='header'>Welcome 👋</h1>
                    <p className='text-dark-700'>Start the day with managing new appointments</p>
                </section>

                <section className='admin-stat'>
                    <StatCard type='appointments' count={appointments.scheduledCount} label='Scheduled appointments' icon='/assets/icons/appointments.svg' />
                    <StatCard type='pending' count={appointments.pendingCount} label='Pending appointments' icon='/assets/icons/pending.svg' />
                    <StatCard type='cancelled' count={appointments.cancelledCount} label='Cancelled appointments' icon='/assets/icons/cancelled.svg' />
                </section>

                <DataTable columns={columns} data={appointments.documents || []} />
            </main>
        </div>
    )
}

export default AdminPage
