const express = require('express');
const router = express.Router();
const schoolAuth = require('../../middleware/schoolAuth');
const {
    addFee,
    getFees,
    updateFee,
    deleteFee,
} = require('../../controllers/admin/fees');

// All fee routes are protected by schoolAuth middleware
router.use(schoolAuth);

router.route('/').post(addFee).get(getFees);
router.route('/:id').put(updateFee).delete(deleteFee);

module.exports = router;