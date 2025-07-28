const mongoose = require('mongoose');

const specialOrderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
    quantity: { type: Number, required: true, min: 1 },
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
    createdAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const SpecialOrder = mongoose.model("SpecialOrder", specialOrderSchema);

module.exports = SpecialOrder;
