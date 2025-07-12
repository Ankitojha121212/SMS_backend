
const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
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
  status: {
    type: String,
    enum: ['paid', 'pending', 'overdue'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
  },
  transactionId: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model('Fee', FeeSchema);
