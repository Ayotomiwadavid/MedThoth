const {getAllUsers, getUserById, updateUserById, searchDoctors} = require('../controllers/user/userController');
const middleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

// Routes for patient operations
router.get('/', middleware, getAllUsers);
router.get('/:id', middleware, getUserById);
router.put('/:id', middleware, updateUserById);

// Route for searching doctors
router.get('/search/doctors', middleware, searchDoctors);

module.exports = router;