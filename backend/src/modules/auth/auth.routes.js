const express = require('express');
const { login, signup, forgotPassword, resetPassword } = require('./auth.controller');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

module.exports = router;
