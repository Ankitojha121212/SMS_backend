const express = require('express');
const router = express.Router();
const { getFees, createFee, updateFee, deleteFee } = require('../../controllers/admin/fees');
const { protect, schoolAdmin } = require('../../middleware/schoolAuth');

router.route('/').get(protect, schoolAdmin, getFees).post(protect, schoolAdmin, createFee);
router.route('/:id').put(protect, schoolAdmin, updateFee).delete(protect, schoolAdmin, deleteFee);

module.exports = router;
