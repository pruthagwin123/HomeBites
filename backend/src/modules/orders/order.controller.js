const { asyncHandler } = require('../../utils/asyncHandler');
const { cartsByUser, foods, getCartWithTotals, makeId, orders } = require('../../data/mockStore');
const { generateOtpCode } = require('../otp/otp.service');

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.body.userId || 'user-customer-1';
  const address = req.body.address || 'HSR Layout, Bengaluru';
  const paymentMethod = req.body.paymentMethod || 'Wallet';
  const cartData = getCartWithTotals(userId);

  if (cartData.items.length === 0) {
    return res.status(400).json({ success: false, message: 'Cart is empty' });
  }

  const firstFood = foods.find((item) => item.id === cartData.items[0].foodId);
  const deliveryOtp = generateOtpCode();
  const order = {
    id: makeId('order'),
    customerId: userId,
    chefId: firstFood ? firstFood.chefId : 'chef-1',
    items: cartData.items.map((item) => ({ foodId: item.foodId, quantity: item.quantity, price: item.unitPrice })),
    totalAmount: cartData.total,
    status: 'placed',
    createdAt: new Date().toISOString(),
    eta: '35 mins',
    address,
    paymentMethod,
    deliveryOtp,
    otpGeneratedAt: new Date().toISOString(),
    otpVerifiedAt: null,
    deliveredAt: null,
    deliveryProofPhotoName: null,
    deliveryConfirmedBy: null
  };

  orders.unshift(order);
  cartsByUser[userId] = [];

  return res.status(201).json({ success: true, message: 'Order placed successfully', data: order });
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.query.userId || 'user-customer-1';
  const rows = orders.filter((item) => item.customerId === userId);
  return res.status(200).json({ success: true, data: rows });
});

const getChefOrders = asyncHandler(async (req, res) => {
  const chefId = req.query.chefId || 'chef-1';
  const rows = orders.filter((item) => item.chefId === chefId);
  return res.status(200).json({ success: true, data: rows });
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const allowed = ['placed', 'preparing', 'out_for_delivery', 'delivered'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status' });
  }

  order.status = status;

  return res.status(200).json({ success: true, message: 'Order status updated', data: order });
});

module.exports = { createOrder, getMyOrders, updateOrderStatus, getChefOrders };
