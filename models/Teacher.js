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
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    subject: {
        type: String,
    },
    classAssigned: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', TeacherSchema);
