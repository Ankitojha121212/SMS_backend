const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addAttendance,
    getAttendance,
    updateAttendance,
    deleteAttendance,
} = require('../../controllers/admin/attendance');

// All attendance routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addAttendance).get(getAttendance);
router.route('/:id').put(updateAttendance).delete(deleteAttendance);

module.exports = router;