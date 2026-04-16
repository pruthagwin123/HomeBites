const { asyncHandler } = require('../../utils/asyncHandler');
const { orders, reviews } = require('../../data/mockStore');

const getChefAnalytics = asyncHandler(async (req, res) => {
  const chefId = req.query.chefId || 'chef-1';
  const chefOrders = orders.filter((item) => item.chefId === chefId);
  const chefReviews = reviews.filter((item) => item.chefId === chefId);
  const revenue = chefOrders.reduce((sum, item) => sum + item.totalAmount, 0);
  const averageRating =
    chefReviews.length > 0
      ? Number((chefReviews.reduce((sum, item) => sum + item.rating, 0) / chefReviews.length).toFixed(1))
      : 0;

  return res.status(200).json({
    success: true,
    data: {
      totalOrders: chefOrders.length,
      revenue,
      averageRating,
      reviewsCount: chefReviews.length,
      completedOrders: chefOrders.filter((item) => item.status === 'delivered').length
    }
  });
});

module.exports = { getChefAnalytics };
