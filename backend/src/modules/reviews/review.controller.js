const { asyncHandler } = require('../../utils/asyncHandler');
const { makeId, reviews } = require('../../data/mockStore');

const createReview = asyncHandler(async (req, res) => {
  const { foodId, chefId, customerName, rating, comment } = req.body;

  if (!foodId || !chefId || !customerName || !rating) {
    return res.status(400).json({ success: false, message: 'foodId, chefId, customerName and rating are required' });
  }

  const row = {
    id: makeId('review'),
    foodId,
    chefId,
    customerName,
    rating: Number(rating),
    comment: comment || ''
  };

  reviews.unshift(row);

  return res.status(201).json({ success: true, message: 'Thanks for sharing your review', data: row });
});

const getFoodReviews = asyncHandler(async (req, res) => {
  const rows = reviews.filter((item) => item.foodId === req.params.foodId);
  return res.status(200).json({ success: true, data: rows });
});

const getChefReviews = asyncHandler(async (req, res) => {
  const rows = reviews.filter((item) => item.chefId === req.params.chefId);
  return res.status(200).json({ success: true, data: rows });
});

module.exports = { createReview, getFoodReviews, getChefReviews };
