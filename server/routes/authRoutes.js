const express = require('express');
const {forgotPassword} = require('../controllers/auth/forgotPassword');
const {login} = require('../controllers/auth/login');
const {register} = require('../controllers/auth/registration');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);

module.exports = router;