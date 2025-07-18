const mongoose = require('mongoose');

const SchoolRegistrationSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: mongoose.Schema.Types.Mixed,
        default: {},
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete'],
        default: 'incomplete',
    },
    currentStep: {
        type: Number,
        default: 1,
    },
}, { timestamps: true });

module.exports = mongoose.model('SchoolRegistration', SchoolRegistrationSchema);