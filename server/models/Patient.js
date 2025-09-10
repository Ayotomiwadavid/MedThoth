const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // Demographics
  gender: { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup: { type: String },
  address: { type: String },

  // Medical information
  medicalHistory: [String], // e.g. ["Diabetes", "Hypertension"]
  allergies: [String],
  currentMedications: [String],

  // Insurance & emergency
  insuranceProvider: { type: String },
  insurancePolicyNumber: { type: String },
  emergencyContact: {
    name: String,
    relation: String,
    phone: String
  }
});

module.exports = mongoose.model('Patient', patientSchema);