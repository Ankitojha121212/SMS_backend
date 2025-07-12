
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  dob: {
    type: Date,
  },
  class: {
    type: String,
  },
  admissionNo: {
    type: String,
  },
  rollNo: {
    type: String,
  },
  academicYear: {
    type: String,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Parent',
  },
  transportOpted: {
    type: Boolean,
  },
  hostelOpted: {
    type: Boolean,
  },
  profilePhoto: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Student', StudentSchema);
