
const express = require('express');
const router = express.Router();
const { createStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } = require('../controllers/students');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateStudentCreation, validateStudentUpdate } = require('../middleware/validation/validation');

// @route   POST api/students
// @desc    Create a new student
// @access  Private (Manager)
router.post('/', [auth, roles('manager'), validateStudentCreation], createStudent);

// @route   GET api/students
// @desc    Get all students
// @access  Private (Teacher, Manager)
router.get('/', [auth, roles('teacher', 'manager')], getAllStudents);

// @route   GET api/students/:id
// @desc    Get student by ID
// @access  Private (Teacher, Manager)
router.get('/:id', [auth, roles('teacher', 'manager')], getStudentById);

// @route   PUT api/students/:id
// @desc    Update student by ID
// @access  Private (Manager)
router.put('/:id', [auth, roles('manager'), validateStudentUpdate], updateStudent);

// @route   DELETE api/students/:id
// @desc    Delete student by ID
// @access  Private (Manager)
router.delete('/:id', [auth, roles('manager')], deleteStudent);

module.exports = router;
