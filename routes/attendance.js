
const express = require('express');
const router = express.Router();
const { markAttendance, getAttendanceByStudent, getAttendanceByClass, updateAttendance } = require('../controllers/attendance');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateMarkAttendance, validateUpdateAttendance } = require('../middleware/validation/validation');

// @route   POST api/attendance
// @desc    Mark attendance for a student
// @access  Private (Teacher, Manager)
router.post('/', [auth, roles('teacher', 'manager'), validateMarkAttendance], markAttendance);

// @route   GET api/attendance/student/:studentId
// @desc    Get attendance records for a specific student
// @access  Private (Student, Parent, Teacher, Manager)
router.get('/student/:studentId', [auth, roles('student', 'parent', 'teacher', 'manager')], getAttendanceByStudent);

// @route   GET api/attendance/class/:class
// @desc    Get attendance records for a specific class
// @access  Private (Teacher, Manager)
router.get('/class/:class', [auth, roles('teacher', 'manager')], getAttendanceByClass);

// @route   PUT api/attendance/:id
// @desc    Update an attendance record
// @access  Private (Teacher, Manager)
router.put('/:id', [auth, roles('teacher', 'manager'), validateUpdateAttendance], updateAttendance);

module.exports = router;
