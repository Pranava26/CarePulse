import Patient from "../models/patient.model.js";

export const registerPatient = async (req, res) => {
    const {
        userId,
        name,
        email,
        phone,
        birthDate,
        gender,
        address,
        occupation,
        emergencyContactName,
        emergencyContactNumber,
        primaryPhysician,
        insuranceProvider,
        insurancePolicyNumber,
        allergies,
        currentMedication,
        familyMedicalHistory,
        pastMedicalHistory,
        identificationType,
        identificationNumber,
        privacyConsent,
        treatmentConsent,
        disclosureConsent } = req.body;

    try {

        const patient = await Patient.findOne({ email });

        if (patient) {
            return res.status(400).json({ message: 'Patient with email already exists' })
        }

        const newPatient = await Patient.create({
            userId,
            name,
            email,
            phone,
            birthDate,
            gender,
            address,
            occupation,
            emergencyContactName,
            emergencyContactNumber,
            primaryPhysician,
            insuranceProvider,
            insurancePolicyNumber,
            allergies,
            currentMedication,
            familyMedicalHistory,
            pastMedicalHistory,
            identificationType,
            identificationNumber,
            privacyConsent,
            treatmentConsent,
            disclosureConsent
        })

        if (!newPatient) {
            return res.status(400).json({ message: 'Patient registration failed' });
        }

        res.status(201).json({ newPatient });

    } catch (error) {
        console.log('Error in registerPatient controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const loginPatient = async (req, res) => {
    const {name, email} = req.body;
    
    try {
        const patient = await Patient.findOne({email});

        if(!patient){
            return res.status(400).json({message: 'No patient found'});
        }

        return res.status(200).json({patient});

    } catch (error) {
        console.log('Error in loginPatient controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getPatient = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const patient = await Patient.findOne({ userId });

        if (!patient) return res.status(400).json({ message: 'No patient found' });

        return res.status(200).json({ patient })

    } catch (error) {
        console.log('Error in getPatient controller', error.message);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}