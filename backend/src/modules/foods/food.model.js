const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    chefId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String },
    price: { type: Number, required: true },
    tags: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    averageRating: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Food', foodSchema);
