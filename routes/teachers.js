
const express = require('express');
const router = express.Router();
const { createTeacher, getAllTeachers, getTeacherById, updateTeacher, deleteTeacher } = require('../controllers/teachers');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateTeacherCreation, validateTeacherUpdate } = require('../middleware/validation/validation');

// @route   POST api/teachers
// @desc    Create a new teacher
// @access  Private (Manager)
router.post('/', [auth, roles('manager'), validateTeacherCreation], createTeacher);

// @route   GET api/teachers
// @desc    Get all teachers
// @access  Private (Manager)
router.get('/', [auth, roles('manager')], getAllTeachers);

// @route   GET api/teachers/:id
// @desc    Get teacher by ID
// @access  Private (Manager)
router.get('/:id', [auth, roles('manager')], getTeacherById);

// @route   PUT api/teachers/:id
// @desc    Update teacher by ID
// @access  Private (Manager)
router.put('/:id', [auth, roles('manager'), validateTeacherUpdate], updateTeacher);

// @route   DELETE api/teachers/:id
// @desc    Delete teacher by ID
// @access  Private (Manager)
router.delete('/:id', [auth, roles('manager')], deleteTeacher);

module.exports = router;
