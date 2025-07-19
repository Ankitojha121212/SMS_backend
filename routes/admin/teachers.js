const express = require('express');
const router = express.Router();
const { getTeachers, createTeacher, updateTeacher, deleteTeacher } = require('../../controllers/admin/teachers');
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');

router.route('/').get(protect, schoolAdmin, getTeachers).post(protect, schoolAdmin, createTeacher);
router.route('/:id').put(protect, schoolAdmin, updateTeacher).delete(protect, schoolAdmin, deleteTeacher);

module.exports = router;
