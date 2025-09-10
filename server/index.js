const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const userRoutes = require('./routes/userRoutess');
const authRoutes = require('./routes/authRoutes');

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    }))
    .catch(err => {
        console.error('Database connection error:', err);
    });