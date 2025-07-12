
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
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
  qualification: {
    type: String,
  },
  subjectSpecialization: {
    type: [String],
  },
  classesAssigned: {
    type: [String],
  },
  joiningDate: {
    type: Date,
  },
  experience: {
    type: Number,
  },
  address: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Teacher', TeacherSchema);
