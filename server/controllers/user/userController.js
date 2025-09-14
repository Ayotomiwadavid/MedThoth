const User = require('../../models/User');
const Doctor = require('../../models/Doctor');

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        if(!users) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    }catch{
        res.status(500).json({ message: error.message });
    }
}

// Get User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    }catch{
        res.status(500).json({ message: error.message });
    }
};

// Update User by ID
const updateUserById = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user) {
            return res.status(404).json({ message: 'User not found' }); 
        }
        res.status(200).json(user);
    }catch{
        res.status(500).json({ message: error.message });
    }
}

// Search Doctors by Specialty, Location, Availability, Consultation Fee
const searchDoctors = async (req, res) => {
    try {
        const { specialty, location, availability, consultationFee } = req.query;
        let filter = { role: 'doctor' };
        if (specialty) filter.specialty = specialty;
        if (location) filter.location = location;
        if (availability) filter.availability = availability;
        if (consultationFee) filter.consultationFee = { $lte: consultationFee };
        const doctors = await Doctor.find(filter);
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById,
    searchDoctors,
}