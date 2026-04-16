const express = require('express');
const { getSubscriptions, createSubscription } = require('./subscription.controller');

const router = express.Router();

router.get('/', getSubscriptions);
router.post('/', createSubscription);

module.exports = router;
