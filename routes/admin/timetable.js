const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addTimetableEntry,
    getTimetableEntries,
    updateTimetableEntry,
    deleteTimetableEntry,
} = require('../../controllers/admin/timetable');

// All timetable routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addTimetableEntry).get(getTimetableEntries);
router.route('/:id').put(updateTimetableEntry).delete(deleteTimetableEntry);

module.exports = router;