const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
        unique: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    },
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    address: {
        type: String,
    },
    contactNumber: {
        type: String,
    },
    email: {
        type: String,
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);