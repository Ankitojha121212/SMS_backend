const Teacher = require('../models/Teacher');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.createTeacher = async (req, res, next) => {
  const { email, password, fullName, gender, dob, qualification, subjectSpecialization, classesAssigned, joiningDate, experience, address, profilePhoto } = req.body;
  const schoolId = req.user.schoolId;

  try {
    // Create a new user entry
    let user = new User({
      email,
      password,
      role: 'teacher',
      schoolId,
    });
    await user.save();

    // Create a new teacher entry
    const teacher = new Teacher({
      userId: user._id,
      schoolId,
      fullName,
      gender,
      dob,
      qualification,
      subjectSpecialization,
      classesAssigned,
      joiningDate,
      experience,
      address,
      profilePhoto,
    });
    await teacher.save();

    res.status(201).json(teacher);
  } catch (err) {
    next(err);
  }
};

exports.getAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({ schoolId: req.user.schoolId }).populate('userId', 'email');
    res.json(teachers);
  } catch (err) {
    next(err);
  }
};

exports.getTeacherById = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id, schoolId: req.user.schoolId }).populate('userId', 'email');
    if (!teacher) {
      return next(new ErrorResponse('Teacher not found', 404));
    }
    res.json(teacher);
  } catch (err) {
    next(err);
  }
};

exports.updateTeacher = async (req, res, next) => {
  try {
    let teacher = await Teacher.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!teacher) {
      return next(new ErrorResponse('Teacher not found', 404));
    }

    teacher = await Teacher.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(teacher);
  } catch (err) {
    next(err);
  }
};

exports.deleteTeacher = async (req, res, next) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!teacher) {
      return next(new ErrorResponse('Teacher not found', 404));
    }

    await User.findByIdAndDelete(teacher.userId); // Delete associated user
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Teacher removed' });
  } catch (err) {
    next(err);
  }
};