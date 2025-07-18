const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    sections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
    }],
    classTeacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
    },
}, { timestamps: true });

module.exports = mongoose.model('Class', ClassSchema);