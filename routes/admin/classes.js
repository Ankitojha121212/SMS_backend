const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addClass,
    getClasses,
    updateClass,
    deleteClass,
} = require('../../controllers/admin/classes');

// All class routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addClass).get(getClasses);
router.route('/:id').put(updateClass).delete(deleteClass);

module.exports = router;