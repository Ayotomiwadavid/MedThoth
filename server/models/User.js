const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    gender: {type: String, required: true}, 
    dob: {type: Date, required: true},
    role: {type: String, enum: ['admin', 'doctor', 'patient'], required: true}
}, {timestamps: true});

// Virtual field for age
userSchema.virtual('age').get(function () {
  if (!this.dob) return null;

  const today = new Date();
  let age = today.getFullYear() - this.dob.getFullYear();
  const m = today.getMonth() - this.dob.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < this.dob.getDate())) {
    age--; // adjust if birthday hasn't happened yet this year
  }

  return age;
});

// Ensure virtuals are included when converting to JSON
userSchema.set('toJSON', { virtuals: true });
userSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model("User", userSchema);