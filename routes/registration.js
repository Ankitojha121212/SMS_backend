const express = require('express');
const router = express.Router();
const {
    saveIncompleteRegistration,
    completeRegistration,
    getRegistration,
} = require('../controllers/registration');

router.post('/incomplete', saveIncompleteRegistration);
router.post('/complete', completeRegistration);
router.get('/:sessionId', getRegistration);

module.exports = router;