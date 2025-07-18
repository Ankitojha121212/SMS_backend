
const express = require('express');
const router = express.Router();
const { createExam, getExamsByClass, getExamById, updateExam, deleteExam } = require('../controllers/exams');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateCreateExam, validateUpdateExam } = require('../middleware/validation/validation');

// @route   POST api/exams
// @desc    Create a new exam
// @access  Private (Manager, Teacher)
router.post('/', [auth, roles('manager', 'teacher'), validateCreateExam], createExam);

// @route   GET api/exams/class/:class
// @desc    Get exams for a specific class
// @access  Private (Student, Teacher, Manager)
router.get('/class/:class', [auth, roles('student', 'teacher', 'manager')], getExamsByClass);

// @route   GET api/exams/:id
// @desc    Get exam by ID
// @access  Private (Student, Teacher, Manager)
router.get('/:id', [auth, roles('student', 'teacher', 'manager')], getExamById);

// @route   PUT api/exams/:id
// @desc    Update an exam
// @access  Private (Manager, Teacher)
router.put('/:id', [auth, roles('manager', 'teacher'), validateUpdateExam], updateExam);

// @route   DELETE api/exams/:id
// @desc    Delete an exam
// @access  Private (Manager)
router.delete('/:id', [auth, roles('school')], deleteExam);

module.exports = router;
