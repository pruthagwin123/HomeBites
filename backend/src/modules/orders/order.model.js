const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food', required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true }
      }
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['placed', 'accepted', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'],
      default: 'placed'
    },
    deliveryOtp: { type: String },
    deliveredAt: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
