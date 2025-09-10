const User = require('../../models/User');

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

module.exports = {
    getAllUsers,
    getUserById,
    updateUserById
}