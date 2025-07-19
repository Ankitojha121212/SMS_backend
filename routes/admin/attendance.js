const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const {
    addAttendance,
    getAttendance,
    updateAttendance,
    deleteAttendance,
} = require('../../controllers/admin/attendance');

router.route('/').post(protect, schoolAdmin, addAttendance).get(protect, schoolAdmin, getAttendance);
router.route('/:id').put(updateAttendance).delete(deleteAttendance);

module.exports = router;