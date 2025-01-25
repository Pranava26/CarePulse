# CarePulse - Patient Management System

## Project Overview

A comprehensive web application built using the MERN (MongoDB, Express.js, React, Node.js) stack to streamline hospital patient management and appointment scheduling.

## 🚀 Live Demo
[CarePulse Live Website](https://carepulse-3ppk.onrender.com)

## 🌟 Key Features

### Patient Portal
- User registration and authentication
- Appointment booking with doctor selection
- Choose preferred date and time slots
- Real-time appointment management

### Admin Panel
- Comprehensive appointment management
- Scheduling, rescheduling, and cancellation capabilities
- Detailed appointment view

### Notification System
- SMS notifications via Twilio API
- Real-time appointment status updates

## 🚀 Technologies Used

- **Frontend**: 
  - React.js
  - Tailwind CSS
  - React Router
  - Zustand

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose ODM

- **Authentication**:
  - JSON Web Tokens (JWT)

- **Integrations**:
  - Twilio API for SMS notifications

## 🔧 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- Twilio Account

### Setup Steps
1. Clone the repository
   ```bash
   git clone https://github.com/Pranava26/CarePulse.git
   ```

2. Install dependencies
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install
   ```

3. Configure environment variables
   ```
   MONGODB_URI=your_mongodb_connection_string
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   JWT_SECRET=your_jwt_secret
   VITE_ADMIN_PASSKEY=your_admin_passkey
   ```

4. Run the application
   ```bash
   # Start backend
   npm run dev

   # Start frontend
   npm run dev
   ```

## 🌈 Key Architectural Decisions

- **Scalable Architecture**: Modular design for easy maintenance and future expansion
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Secure Authentication**: JWT-based authentication with role-based access control

## 📦 Key Modules

1. **User Authentication Module**
   - Registration
   - Login

2. **Appointment Management Module**
   - Booking
   - Modification
   - Cancellation

3. **Notification Service**
   - SMS Alerts

## 🔒 Security Features

- JWT-based authentication
- Role-based access control
- Input validation

## 🤝 Contributing

Contributions are welcome!
