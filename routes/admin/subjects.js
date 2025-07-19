const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const {
    addSubject,
    getSubjects,
    updateSubject,
    deleteSubject,
} = require('../../controllers/admin/subjects');

router.route('/').post(protect, schoolAdmin, addSubject).get(protect, schoolAdmin, getSubjects);
router.route('/:id').put(updateSubject).delete(deleteSubject);

module.exports = router;