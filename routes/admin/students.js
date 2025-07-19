const express = require('express');
const router = express.Router();
const { getStudents, createStudent, updateStudent, deleteStudent } = require('../../controllers/admin/students');
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');

router.route('/').get(protect, schoolAdmin, getStudents).post(protect, schoolAdmin, createStudent);
router.route('/:id').put(protect, schoolAdmin, updateStudent).delete(protect, schoolAdmin, deleteStudent);

module.exports = router;
