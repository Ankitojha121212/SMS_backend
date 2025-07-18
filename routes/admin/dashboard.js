const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const { getDashboardStats } = require('../../controllers/admin/dashboard');

// Dashboard routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/stats').get(getDashboardStats);

module.exports = router;