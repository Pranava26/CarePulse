import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import { connectToDb } from './lib/db.js';
import cors from "cors";

import path from 'path';

import userRoutes from './routes/user.route.js'
import patientRoutes from './routes/patient.route.js'
import appointmentRoutes from './routes/appointment.route.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointment', appointmentRoutes);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
    connectToDb();
})