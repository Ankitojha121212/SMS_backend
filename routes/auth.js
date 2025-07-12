
const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth');
const auth = require('../middleware/auth');
const { validateRegistration, validateLogin } = require('../middleware/validation/validation');

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/me', auth, getMe);

module.exports = router;
