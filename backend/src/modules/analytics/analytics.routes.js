const express = require('express');
const { getChefAnalytics } = require('./analytics.controller');

const router = express.Router();

router.get('/chef', getChefAnalytics);

module.exports = router;
