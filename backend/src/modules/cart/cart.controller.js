const { asyncHandler } = require('../../utils/asyncHandler');
const { cartsByUser, getCartWithTotals } = require('../../data/mockStore');

function getUserCartBucket(userId) {
  if (!cartsByUser[userId]) {
    cartsByUser[userId] = [];
  }

  return cartsByUser[userId];
}

const getCart = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  return res.status(200).json({ success: true, data: getCartWithTotals(userId) });
});

const addCartItem = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const foodId = req.body.foodId;
  const quantity = Number(req.body.quantity || 1);

  if (!foodId) {
    return res.status(400).json({ success: false, message: 'foodId is required' });
  }

  const cart = getUserCartBucket(userId);
  const existing = cart.find((item) => item.foodId === foodId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ foodId, quantity });
  }

  return res.status(201).json({
    success: true,
    message: 'Item added to cart',
    data: getCartWithTotals(userId)
  });
});

const updateCartItemQuantity = asyncHandler(async (req, res) => {
  const userId = req.body.userId || req.query.userId || 'user-customer-1';
  const quantity = Number(req.body.quantity);
  const { foodId } = req.params;
  const cart = getUserCartBucket(userId);
  const existing = cart.find((item) => item.foodId === foodId);

  if (!existing) {
    return res.status(404).json({ success: false, message: 'Cart item not found' });
  }

  if (quantity <= 0) {
    cartsByUser[userId] = cart.filter((item) => item.foodId !== foodId);
  } else {
    existing.quantity = quantity;
  }

  return res.status(200).json({ success: true, data: getCartWithTotals(userId) });
});

const removeCartItem = asyncHandler(async (req, res) => {
  const userId = req.body.userId || req.query.userId || 'user-customer-1';
  const { foodId } = req.params;
  const cart = getUserCartBucket(userId);

  cartsByUser[userId] = cart.filter((item) => item.foodId !== foodId);

  return res.status(200).json({
    success: true,
    message: 'Item removed from cart',
    data: getCartWithTotals(userId)
  });
});

module.exports = { getCart, addCartItem, updateCartItemQuantity, removeCartItem };
