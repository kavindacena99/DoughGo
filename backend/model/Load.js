const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema(
    {
        driverId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
        items: [
            {
                itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
                quantity: { type: Number, required: true, min: 1 },
            }
        ],
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

const Load = mongoose.model("Load", loadSchema);

module.exports = Load;