const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    planName: { type: String, required: true },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);
