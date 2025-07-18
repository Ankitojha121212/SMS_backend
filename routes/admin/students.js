const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addStudent,
    getStudents,
    updateStudent,
    deleteStudent,
} = require('../../controllers/admin/students');

// All student routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addStudent).get(getStudents);
router.route('/:id').put(updateStudent).delete(deleteStudent);

module.exports = router;