const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addSection,
    getSections,
    updateSection,
    deleteSection,
} = require('../../controllers/admin/sections');

// All section routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addSection).get(getSections);
router.route('/:id').put(updateSection).delete(deleteSection);

module.exports = router;