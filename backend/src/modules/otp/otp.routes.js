const express = require('express');
const { generateDeliveryOtp, verifyDeliveryOtp, completeDeliveryWithProof } = require('./otp.controller');

const router = express.Router();

router.post('/delivery/generate', generateDeliveryOtp);
router.post('/delivery/verify', verifyDeliveryOtp);
router.post('/delivery/proof', completeDeliveryWithProof);

module.exports = router;
