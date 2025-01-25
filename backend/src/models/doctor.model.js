import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({

}, {timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;