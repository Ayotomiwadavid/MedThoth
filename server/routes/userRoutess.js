const {getAllUsers, getUserById, updateUserById} = require('../controllers/user/userController');
const middleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

// Routes for patient operations
router.get('/', middleware, getAllUsers);
router.get('/:id', middleware, getUserById);
router.put('/:id', middleware, updateUserById);

module.exports = router;