const express = require('express');
const router = express.Router();
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');
const { getDashboardStats } = require('../../controllers/admin/dashboard');

router.route('/stats').get(protect, schoolAdmin, getDashboardStats);

module.exports = router;