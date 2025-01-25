import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
    },
    address: {
        type: String,
    },
    occupation: {
        type: String,
    },
    emergencyContactName: {
        type: String,
    },
    emergencyContactNumber: {
        type: String,
    },
    insuranceProvider: {
        type: String,
    },
    insurancePolicyNumber: {
        type: String,
    },
    allergies: {
        type: String,
    },
    currentMedication: {
        type: String,
    },
    familyMedicalHistory: {
        type: String,
    },
    pastMedicalHistory: {
        type: String,
    },
    identificationType: {
        type: String,
    },
    identificationNumber: {
        type: String,
    },
    identificationDocumentId: {
        type: String,
    },
    primaryPhyisician: {
        type: String,
    },
    privacyConsent: {
        type: Boolean,
        default: null,
        required: true
    },
    treatmentConsent: {
        type: Boolean,
        default: null,
        required: true
    },
    disclosureConsent: {
        type: Boolean,
        default: null,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    }

}, {timestamps: true});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;