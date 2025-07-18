const express = require('express');
const router = express.Router();
const { registerSchool, loginSchool } = require('../controllers/schoolAuth');

router.post('/register', registerSchool);
router.post('/login', loginSchool);

module.exports = router;