const Patient = require('../../models/Patient');
const User = require('../../models/User');

// Get all patients
const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.find().populate('userId', 'name email');
        if (patients.length === 0) {
            return res.status(404).json({ message: 'No patients found' });
        }
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// Get patient by ID
const getPatientById = async (req, res) => {
    const userId = req.params.id;
    try {
        const patientProfile = await Patient.findOne({ userId }).populate('userId', 'name email');
        if (!patientProfile) {
            return res.status(404).json({ message: 'Patient not found' });  
        }
        res.status(200).json(patientProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

// Update Patient
const UpdatePatient = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body

    try {
        const user = await Patient.findAndUpdate({ userId }, updateData, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}


module.exports = {
    getAllPatients,
    getPatientById,
    UpdatePatient
}