
const mongoose = require('mongoose');

const ManagerSchema = new mongoose.Schema({
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
  designation: {
    type: String,
  },
  dob: {
    type: Date,
  },
  qualification: {
    type: String,
  },
  joiningDate: {
    type: Date,
  },
  profilePhoto: {
    type: String,
  },
  accessLevel: {
    type: String,
    enum: ['superadmin', 'manager'],
  },
});

module.exports = mongoose.model('Manager', ManagerSchema);
