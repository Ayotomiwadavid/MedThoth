const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DoctorApprovalSchema = new Schema({
    doctorId: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true,
        unique: true
    },

    // Professional Information
    specialty: {
        type: String,
        required: true
    },

    subSpecialty: {
        type: String
    },

    yearsOfPractice: {
        type: Number,
        required: true
    },

    medicalLicenseNumber: {
        type: String,
        required: true
    },

    licenseIssuingAuthority: {
        type: String,
        required: true
    },

    currentWorkplace: {
        type: String
    },

    consultationFee: {
        type: Number,
        default: 0
    },

    languagesSpoken: [{
        type: String
    }],

    // Verification Documents
    licenseCertificateUrl: {
        type: String,
        required: true
    },
    degreeCertificateUrl: {
        type: String,
        required: true
    },
    govtIdUrl: {
        type: String,
        required: true
    },
    proofOfAddressUrl: {
        type: String
    },

    // Review Fields
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },

    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },

    reviewedAt: {
        type: Date
    },

    remarks: {
        type: String
    }
    
}, { timestamps: true });

module.exports = mongoose.model('DoctorApproval', DoctorApprovalSchema);