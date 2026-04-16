const { asyncHandler } = require('../../utils/asyncHandler');
const { orders } = require('../../data/mockStore');
const { generateOtpCode } = require('./otp.service');
const { orderDeliveredOtpTemplate } = require('../../templates/email/orderDeliveredOtp.template');

const generateDeliveryOtp = asyncHandler(async (req, res) => {
  const { orderId, customerName = 'Customer' } = req.body;
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const otp = generateOtpCode();
  order.deliveryOtp = otp;
  order.otpGeneratedAt = new Date().toISOString();
  order.otpVerifiedAt = null;
  order.deliveredAt = null;
  order.deliveryProofPhotoName = null;
  order.deliveryConfirmedBy = null;

  const emailPayload = orderDeliveredOtpTemplate({
    otp,
    customerName,
    orderId: order.id
  });

  return res.status(200).json({
    success: true,
    message: 'Delivery OTP generated successfully',
    data: {
      orderId: order.id,
      otp,
      otpGeneratedAt: order.otpGeneratedAt,
      emailNotificationPayload: emailPayload
    }
  });
});

const verifyDeliveryOtp = asyncHandler(async (req, res) => {
  const { orderId, otp, deliveryPartnerName = 'Delivery Partner' } = req.body;
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (!order.deliveryOtp || String(otp) !== String(order.deliveryOtp)) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
  }

  order.otpVerifiedAt = new Date().toISOString();
  order.deliveryConfirmedBy = deliveryPartnerName;

  return res.status(200).json({
    success: true,
    message: 'OTP verified. Please upload proof to complete delivery.',
    data: {
      orderId: order.id,
      otpVerifiedAt: order.otpVerifiedAt,
      deliveryConfirmedBy: order.deliveryConfirmedBy
    }
  });
});

const completeDeliveryWithProof = asyncHandler(async (req, res) => {
  const { orderId, proofPhotoName } = req.body;
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  if (!order.otpVerifiedAt) {
    return res.status(400).json({ success: false, message: 'Verify OTP before completing delivery' });
  }

  if (!proofPhotoName) {
    return res.status(400).json({ success: false, message: 'proofPhotoName is required' });
  }

  order.deliveryProofPhotoName = proofPhotoName;
  order.deliveredAt = new Date().toISOString();
  order.status = 'delivered';

  return res.status(200).json({
    success: true,
    message: 'Delivery completed successfully',
    data: {
      orderId: order.id,
      deliveredAt: order.deliveredAt,
      deliveryProofPhotoName: order.deliveryProofPhotoName,
      deliveryConfirmedBy: order.deliveryConfirmedBy
    }
  });
});

module.exports = { generateDeliveryOtp, verifyDeliveryOtp, completeDeliveryWithProof };
