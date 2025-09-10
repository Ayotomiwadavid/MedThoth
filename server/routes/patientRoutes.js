const {getAllPatients, getPatientById, UpdatePatient} = require('../controllers/patient/patientController');
const middleware = require('../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

// Routes for patient operations
router.get('/', middleware, getAllPatients);
router.get('/:id', middleware, getPatientById);
router.put('/:id', middleware, UpdatePatient);

module.exports = router;