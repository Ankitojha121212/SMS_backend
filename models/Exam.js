
const mongoose = require('mongoose');

const ExamSchema = new mongoose.Schema({
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  maxMarks: {
    type: Number,
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
});

module.exports = mongoose.model('Exam', ExamSchema);
