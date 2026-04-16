const express = require('express');
const { createReview, getFoodReviews, getChefReviews } = require('./review.controller');

const router = express.Router();

router.post('/', createReview);
router.get('/food/:foodId', getFoodReviews);
router.get('/chef/:chefId', getChefReviews);

module.exports = router;
