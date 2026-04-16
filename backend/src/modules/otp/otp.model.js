const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true },
    isUsed: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Otp', otpSchema);
