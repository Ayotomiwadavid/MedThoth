const doctor = require('../../models/Doctor');

// Get all doctors
const getAllDoctors = async (res, req) => {
    try {
        const doctors = await doctor.find().populate('userId', 'name', 'email');
        if (doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found' });
        }
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Get doctor by ID
const getDoctorById = async (req, res) => {
    const userId = req.params.id;
    try {
        const doctorProfile = await doctor.findOne({ userId }).populate('userId', 'name', 'email');
        if (!doctorProfile) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(doctorProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Update doctor profile
const updateDoctorProfile = async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body;
    try {
        const user = await doctor.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({ message: 'Doctor not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
}

module.exports = {
    getAllDoctors,
    getDoctorById,
    updateDoctorProfile,
};