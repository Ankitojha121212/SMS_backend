const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const {
    addSection,
    getSections,
    updateSection,
    deleteSection,
} = require('../../controllers/admin/sections');

router.route('/').post(protect, schoolAdmin, addSection).get(protect, schoolAdmin, getSections);
router.route('/:id').put(updateSection).delete(deleteSection);

module.exports = router;