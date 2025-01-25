import express from "express";
import { getPatient, registerPatient, loginPatient } from "../controllers/patient.controller.js";

const router = express.Router();

router.post('/register', registerPatient);

router.post('/login', loginPatient);

router.get('/:userId', getPatient);


export default router