
const mongoose = require('mongoose');

const ParentSchema = new mongoose.Schema({
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
  studentId: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Student',
  },
  relation: {
    type: String,
  },
  address: {
    type: String,
  },
  preferredLanguage: {
    type: String,
  },
  profilePhoto: {
    type: String,
  },
});

module.exports = mongoose.model('Parent', ParentSchema);
