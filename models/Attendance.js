const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Present', 'Absent', 'Late', 'Excused'],
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    },
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);