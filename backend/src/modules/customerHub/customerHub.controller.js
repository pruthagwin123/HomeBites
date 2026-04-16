const { asyncHandler } = require('../../utils/asyncHandler');
const {
  chatsByRoom,
  coupons,
  makeId,
  savedAddressesByUser,
  savedMealPlansByUser
} = require('../../data/mockStore');

const getCoupons = asyncHandler(async (req, res) => {
  return res.status(200).json({ success: true, data: coupons });
});

const getAddresses = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  return res.status(200).json({ success: true, data: savedAddressesByUser[userId] || [] });
});

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const { label, address, landmark } = req.body;

  if (!label || !address) {
    return res.status(400).json({ success: false, message: 'label and address are required' });
  }

  if (!savedAddressesByUser[userId]) {
    savedAddressesByUser[userId] = [];
  }

  const row = {
    id: makeId('addr'),
    label,
    address,
    landmark: landmark || ''
  };

  savedAddressesByUser[userId].unshift(row);

  return res.status(201).json({ success: true, data: row });
});

const getMealPlans = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  return res.status(200).json({ success: true, data: savedMealPlansByUser[userId] || [] });
});

const addMealPlan = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const { title, schedule, tags, targetCalories } = req.body;

  if (!title || !schedule) {
    return res.status(400).json({ success: false, message: 'title and schedule are required' });
  }

  if (!savedMealPlansByUser[userId]) {
    savedMealPlansByUser[userId] = [];
  }

  const row = {
    id: makeId('plan'),
    title,
    schedule,
    tags: tags || [],
    targetCalories: targetCalories || ''
  };

  savedMealPlansByUser[userId].unshift(row);

  return res.status(201).json({ success: true, data: row });
});

const getChatMessages = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  const roomId = `customer-${userId}-${req.params.chefId}`;
  return res.status(200).json({ success: true, data: chatsByRoom[roomId] || [] });
});

const sendChatMessage = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const text = String(req.body.text || '').trim();
  const senderRole = req.body.senderRole || 'customer';

  if (!text) {
    return res.status(400).json({ success: false, message: 'text is required' });
  }

  const roomId = `customer-${userId}-${req.params.chefId}`;
  if (!chatsByRoom[roomId]) {
    chatsByRoom[roomId] = [];
  }

  const row = {
    id: makeId('msg'),
    senderRole,
    text,
    at: new Date().toISOString()
  };

  chatsByRoom[roomId].push(row);

  return res.status(201).json({ success: true, data: row });
});

module.exports = {
  getCoupons,
  getAddresses,
  addAddress,
  getMealPlans,
  addMealPlan,
  getChatMessages,
  sendChatMessage
};
