const { asyncHandler } = require('../../utils/asyncHandler');
const { orders } = require('../../data/mockStore');

const orderedStages = ['placed', 'preparing', 'out_for_delivery', 'delivered'];

const getOrderTracking = asyncHandler(async (req, res) => {
  const order = orders.find((item) => item.id === req.params.orderId);

  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }

  const currentIndex = orderedStages.indexOf(order.status);
  const timeline = orderedStages.map((stage, index) => ({
    stage,
    done: index <= currentIndex
  }));

  return res.status(200).json({
    success: true,
    data: {
      orderId: order.id,
      status: order.status,
      eta: order.eta,
      timeline,
      deliveryOtp: order.deliveryOtp,
      otpGeneratedAt: order.otpGeneratedAt,
      otpVerifiedAt: order.otpVerifiedAt,
      deliveredAt: order.deliveredAt,
      deliveryProofPhotoName: order.deliveryProofPhotoName,
      deliveryConfirmedBy: order.deliveryConfirmedBy
    }
  });
});

module.exports = { getOrderTracking };
