const express = require('express');
const { getAllDoctors, getDoctorById, updateDoctorProfile } = require('../controllers/doctor/doctorController');
const middleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/alldoctors', middleware, getAllDoctors);
router.get('/getdoctor/:id', middleware, getDoctorById);
router.put('/updatedoctor/:id', middleware, updateDoctorProfile);

module.exports = router;