import './App.css'
import { ThemeProvider } from './components/theme-provider'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PatientRegisterPage from './pages/PatientRegisterPage'
import { useEffect } from 'react'
import { useAuthStore } from './store/useAuthStore'
import NewAppointmentPage from './pages/NewAppointmentPage'
import AppointmentSuccessPage from './pages/AppointmentSuccessPage'
import AdminPage from './pages/AdminPage'
import { Toaster } from 'react-hot-toast'
import PatientLoginPage from './pages/PatientLoginPage'

function App() {
  const {checkAuth, authUser, isCheckingAuth, signup} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth, signup]);
  

  if(isCheckingAuth && !authUser) return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-white'>Loading...</p>
    </div>
  )

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/patients/:userId/register' element={authUser ? <PatientRegisterPage /> : <Navigate to='/' />} />
        <Route path='/patients/:userId/login' element={authUser ? <PatientLoginPage /> : <Navigate to='/' />} />
        <Route path='/patients/:userId/new-appointment' element={authUser ? <NewAppointmentPage /> : <Navigate to='/' />} />
        <Route path='/patients/:userId/new-appointment/success' element={authUser ? <AppointmentSuccessPage /> : <Navigate to='/' />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>

      <Toaster />
    </ThemeProvider>
  )
}

export default App
