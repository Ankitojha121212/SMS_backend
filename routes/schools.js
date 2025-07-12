
const express = require('express');
const router = express.Router();
const { registerSchool, getSchoolDetails, updateSchoolDetails, deleteSchool } = require('../controllers/schools');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateSchoolRegistration } = require('../middleware/validation/validation');

// @route   POST api/schools
// @desc    Register a new school
// @access  Public
router.post('/', validateSchoolRegistration, registerSchool);

// @route   GET api/schools/:id
// @desc    Get school details by ID
// @access  Private (Manager, Superadmin)
router.get('/:id', [auth, roles('manager', 'superadmin')], getSchoolDetails);

// @route   PUT api/schools/:id
// @desc    Update school details by ID
// @access  Private (Manager, Superadmin)
router.put('/:id', [auth, roles('manager', 'superadmin')], updateSchoolDetails);

// @route   DELETE api/schools/:id
// @desc    Delete school by ID
// @access  Private (Superadmin)
router.delete('/:id', [auth, roles('superadmin')], deleteSchool);

module.exports = router;
