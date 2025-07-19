const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const {
    addTimetableEntry,
    getTimetableEntries,
    updateTimetableEntry,
    deleteTimetableEntry,
} = require('../../controllers/admin/timetable');

router.route('/').post(protect, schoolAdmin, addTimetableEntry).get(protect, schoolAdmin, getTimetableEntries);
router.route('/:id').put(updateTimetableEntry).delete(deleteTimetableEntry);

module.exports = router;