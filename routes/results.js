const express = require('express');
const router = express.Router();
const { addResult, getResultsByStudent, getResultsByExam, updateResult, deleteResult } = require('../controllers/results');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateAddResult, validateUpdateResult } = require('../middleware/validation/validation');

// @route   POST api/results
// @desc    Add a new result for a student
// @access  Private (Teacher, Manager)
router.post('/', [auth, roles('teacher', 'manager'), validateAddResult], addResult);

// @route   GET api/results/student/:studentId
// @desc    Get all results for a specific student
// @access  Private (Student, Parent, Teacher, Manager)
router.get('/student/:studentId', [auth, roles('student', 'parent', 'teacher', 'manager')], getResultsByStudent);

// @route   GET api/results/exam/:examId
// @desc    Get all results for a specific exam
// @access  Private (Teacher, Manager)
router.get('/exam/:examId', [auth, roles('teacher', 'manager')], getResultsByExam);

// @route   PUT api/results/:id
// @desc    Update a result record
// @access  Private (Teacher, Manager)
router.put('/:id', [auth, roles('teacher', 'manager'), validateUpdateResult], updateResult);

// @route   DELETE api/results/:id
// @desc    Delete a result record
// @access  Private (Manager)
router.delete('/:id', [auth, roles('manager')], deleteResult);

module.exports = router;