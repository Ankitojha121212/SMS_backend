
const express = require('express');
const router = express.Router();
const { createParent, getAllParents, getParentById, updateParent, deleteParent } = require('../controllers/parents');
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { validateParentCreation, validateParentUpdate } = require('../middleware/validation/validation');

// @route   POST api/parents
// @desc    Create a new parent
// @access  Private (Manager)
router.post('/', [auth, roles('manager'), validateParentCreation], createParent);

// @route   GET api/parents
// @desc    Get all parents
// @access  Private (Manager)
router.get('/', [auth, roles('manager')], getAllParents);

// @route   GET api/parents/:id
// @desc    Get parent by ID
// @access  Private (Manager)
router.get('/:id', [auth, roles('manager')], getParentById);

// @route   PUT api/parents/:id
// @desc    Update parent by ID
// @access  Private (Manager)
router.put('/:id', [auth, roles('manager'), validateParentUpdate], updateParent);

// @route   DELETE api/parents/:id
// @desc    Delete parent by ID
// @access  Private (Manager)
router.delete('/:id', [auth, roles('school')], deleteParent);

module.exports = router;
