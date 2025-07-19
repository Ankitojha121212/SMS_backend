const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const {
    addClass,
    getClasses,
    updateClass,
    deleteClass,
} = require('../../controllers/admin/classes');

router.route('/').post(protect, schoolAdmin, addClass).get(protect, schoolAdmin, getClasses);
router.route('/:id').put(updateClass).delete(deleteClass);

module.exports = router;