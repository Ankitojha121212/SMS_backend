const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        unique: true,
    },
    classes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Class',
    }],
}, { timestamps: true });

module.exports = mongoose.model('Subject', SubjectSchema);