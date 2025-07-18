
const express = require('express');
const router = express.Router();
const { createFee, getFeesByStudent, updateFeeStatus, getAllFees, deleteFee } = require('../controllers/fees');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateCreateFee, validateUpdateFeeStatus } = require('../middleware/validation/validation');

// @route   POST api/fees
// @desc    Create a new fee record
// @access  Private (Manager)
router.post('/', [auth, roles('manager'), validateCreateFee], createFee);

// @route   GET api/fees/student/:studentId
// @desc    Get fee records for a specific student
// @access  Private (Student, Parent, Manager)
router.get('/student/:studentId', [auth, roles('student', 'parent', 'manager')], getFeesByStudent);

// @route   PUT api/fees/:id
// @desc    Update fee status
// @access  Private (Manager)
router.put('/:id', [auth, roles('manager'), validateUpdateFeeStatus], updateFeeStatus);

// @route   GET api/fees
// @desc    Get all fee records for a school
// @access  Private (Manager)
router.get('/', [auth, roles('manager')], getAllFees);

// @route   DELETE api/fees/:id
// @desc    Delete a fee record
// @access  Private (Manager)
router.delete('/:id', [auth, roles('school')], deleteFee);

module.exports = router;
