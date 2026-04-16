const { asyncHandler } = require('../../utils/asyncHandler');
const { makeId, subscriptionsByUser } = require('../../data/mockStore');

const getSubscriptions = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  return res.status(200).json({ success: true, data: subscriptionsByUser[userId] || [] });
});

const createSubscription = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const { planName, period, mealsPerWeek, chefId, chefName, amount } = req.body;

  if (!planName || !period || !mealsPerWeek || !chefId || !chefName || !amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields for subscription plan' });
  }

  if (!['weekly', 'monthly'].includes(period)) {
    return res.status(400).json({ success: false, message: 'period must be weekly or monthly' });
  }

  if (!subscriptionsByUser[userId]) {
    subscriptionsByUser[userId] = [];
  }

  const row = {
    id: makeId('sub'),
    planName,
    period,
    mealsPerWeek: Number(mealsPerWeek),
    chefId,
    chefName,
    amount: Number(amount),
    status: 'active'
  };

  subscriptionsByUser[userId].unshift(row);

  return res.status(201).json({ success: true, message: 'Subscription plan created', data: row });
});

module.exports = { getSubscriptions, createSubscription };
