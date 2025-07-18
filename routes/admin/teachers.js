const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addTeacher,
    getTeachers,
    updateTeacher,
    deleteTeacher,
} = require('../../controllers/admin/teachers');

// All teacher routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addTeacher).get(getTeachers);
router.route('/:id').put(updateTeacher).delete(deleteTeacher);

module.exports = router;