const express = require('express');
const authRoutes = require('../modules/auth/auth.routes');
const chefRoutes = require('../modules/chefs/chef.routes');
const foodRoutes = require('../modules/foods/food.routes');
const cartRoutes = require('../modules/cart/cart.routes');
const orderRoutes = require('../modules/orders/order.routes');
const trackingRoutes = require('../modules/tracking/tracking.routes');
const walletRoutes = require('../modules/wallet/wallet.routes');
const subscriptionRoutes = require('../modules/subscriptions/subscription.routes');
const reviewRoutes = require('../modules/reviews/review.routes');
const analyticsRoutes = require('../modules/analytics/analytics.routes');
const otpRoutes = require('../modules/otp/otp.routes');
const notificationRoutes = require('../modules/notifications/notification.routes');
const customerHubRoutes = require('../modules/customerHub/customerHub.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/chefs', chefRoutes);
router.use('/foods', foodRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/tracking', trackingRoutes);
router.use('/wallet', walletRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/reviews', reviewRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/otp', otpRoutes);
router.use('/notifications', notificationRoutes);
router.use('/customer-hub', customerHubRoutes);

module.exports = router;
