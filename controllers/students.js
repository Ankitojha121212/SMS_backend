const Student = require('../models/Student');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

exports.createStudent = async (req, res, next) => {
  const { email, password, fullName, gender, dob, className, admissionNo, rollNo, academicYear, phone, address, parentId, transportOpted, hostelOpted, profilePhoto } = req.body;
  const schoolId = req.user.schoolId; // Assuming schoolId is available from authenticated user

  try {
    // Create a new user entry
    let user = new User({
      email,
      password,
      role: 'student',
      schoolId,
    });
    await user.save();

    // Create a new student entry
    const student = new Student({
      userId: user._id,
      schoolId,
      fullName,
      gender,
      dob,
      class: studentClass,
      admissionNo,
      rollNo,
      academicYear,
      phone,
      address,
      parentId,
      transportOpted,
      hostelOpted,
      profilePhoto,
    });
    await student.save();

    res.status(201).json(student);
  } catch (err) {
    next(err);
  }
};

exports.getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find({ schoolId: req.user.schoolId }).populate('userId', 'email').populate('parentId', 'fullName');
    res.json(students);
  } catch (err) {
    next(err);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, schoolId: req.user.schoolId }).populate('userId', 'email').populate('parentId', 'fullName');
    if (!student) {
      return next(new ErrorResponse('Student not found', 404));
    }
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.updateStudent = async (req, res, next) => {
  try {
    let student = await Student.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!student) {
      return next(new ErrorResponse('Student not found', 404));
    }

    student = await Student.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(student);
  } catch (err) {
    next(err);
  }
};

exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.findOne({ _id: req.params.id, schoolId: req.user.schoolId });
    if (!student) {
      return next(new ErrorResponse('Student not found', 404));
    }

    await User.findByIdAndDelete(student.userId); // Delete associated user
    await Student.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Student removed' });
  } catch (err) {
    next(err);
  }
};