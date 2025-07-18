
const express = require('express');
const router = express.Router();
const { createManager, getAllManagers, getManagerById, updateManager, deleteManager } = require('../controllers/managers');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateManagerCreation, validateManagerUpdate } = require('../middleware/validation/validation');

// @route   POST api/managers
// @desc    Create a new manager
// // @access  Private (Superadmin)
router.post('/', [auth, roles('superadmin'), validateManagerCreation], createManager);

// @route   GET api/managers
// @desc    Get all managers
// @access  Private (Superadmin)
router.get('/', [auth, roles('superadmin')], getAllManagers);

// @route   GET api/managers/:id
// @desc    Get manager by ID
// @access  Private (Superadmin)
router.get('/:id', [auth, roles('superadmin')], getManagerById);

// @route   PUT api/managers/:id
// @desc    Update manager by ID
// @access  Private (Superadmin)
router.put('/:id', [auth, roles('superadmin'), validateManagerUpdate], updateManager);

// @route   DELETE api/managers/:id
// @desc    Delete manager by ID
// @access  Private (Superadmin)
router.delete('/:id', [auth, roles('school')], deleteManager);

module.exports = router;
