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
    class: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    section: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    dateOfBirth: {
        type: Date,
    },
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
