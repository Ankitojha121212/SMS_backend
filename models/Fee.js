const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    paymentDate: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Paid', 'Unpaid', 'Partially Paid'],
        default: 'Unpaid',
    },
    description: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Fee', FeeSchema);