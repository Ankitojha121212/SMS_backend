
const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true,
  },
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
  marksObtained: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
  },
});

module.exports = mongoose.model('Result', ResultSchema);
