const express = require('express');
const { getOrderTracking } = require('./tracking.controller');

const router = express.Router();

router.get('/:orderId', getOrderTracking);

module.exports = router;
