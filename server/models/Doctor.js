const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Professional details
  specialization: { type: String, required: true },
  qualifications: [String], // e.g. ["MBBS", "MD"]
  licenseNumber: { type: String, required: true, unique: true },
  yearsOfExperience: { type: Number, default: 0 },

  // Practice details
  hospitalOrClinic: { type: String },
  consultationFee: { type: Number, default: 0 },
  availability: [
    {
      day: String,       // e.g. "Monday"
      startTime: String, // e.g. "09:00"
      endTime: String    // e.g. "17:00"
    }
  ],

  // Extra
  bio: String,
  ratings: { type: Number, default: 0 },
  reviews: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
      comment: String,
      stars: Number,
      createdAt: { type: Date, default: Date.now }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Doctor', doctorSchema);