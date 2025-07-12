
const Attendance = require('../models/Attendance');
const ErrorResponse = require('../utils/errorResponse');

exports.markAttendance = async (req, res, next) => {
  const { studentId, date, status, class: studentClass } = req.body;
  const schoolId = req.user.schoolId;
  const markedBy = req.user.id;

  try {
    const attendance = new Attendance({
      studentId,
      schoolId,
      date,
      status,
      markedBy,
      class: studentClass,
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByStudent = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find({
      studentId: req.params.studentId,
      schoolId: req.user.schoolId,
    }).populate('studentId', 'fullName');

    res.json(attendanceRecords);
  } catch (err) {
    next(err);
  }
};

exports.getAttendanceByClass = async (req, res, next) => {
  try {
    const attendanceRecords = await Attendance.find({
      class: req.params.class,
      schoolId: req.user.schoolId,
    }).populate('studentId', 'fullName');

    res.json(attendanceRecords);
  } catch (err) {
    next(err);
  }
};

exports.updateAttendance = async (req, res, next) => {
  try {
    let attendance = await Attendance.findById(req.params.id);

    if (!attendance) {
      return next(new ErrorResponse('Attendance record not found', 404));
    }

    // Ensure the record belongs to the user's school
    if (attendance.schoolId.toString() !== req.user.schoolId) {
      return next(new ErrorResponse('Not authorized to update this record', 401));
    }

    attendance = await Attendance.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });

    res.json(attendance);
  } catch (err) {
    next(err);
  }
};
