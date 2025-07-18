const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addSubject,
    getSubjects,
    updateSubject,
    deleteSubject,
} = require('../../controllers/admin/subjects');

// All subject routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addSubject).get(getSubjects);
router.route('/:id').put(updateSubject).delete(deleteSubject);

module.exports = router;