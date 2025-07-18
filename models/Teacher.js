const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    teacherId: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contactNumber: {
        type: String,
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
    subjectsTaught: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
    }],
    classesAssigned: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);