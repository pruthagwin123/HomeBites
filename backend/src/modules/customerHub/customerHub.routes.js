const express = require('express');
const {
  getCoupons,
  getAddresses,
  addAddress,
  getMealPlans,
  addMealPlan,
  getChatMessages,
  sendChatMessage
} = require('./customerHub.controller');

const router = express.Router();

router.get('/coupons', getCoupons);
router.get('/addresses', getAddresses);
router.post('/addresses', addAddress);
router.get('/meal-plans', getMealPlans);
router.post('/meal-plans', addMealPlan);
router.get('/chat/:chefId', getChatMessages);
router.post('/chat/:chefId', sendChatMessage);

module.exports = router;
