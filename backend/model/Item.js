const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
    {
        itemname: { type:String, required:true },
        itemweight: { type:String, required:true},
        itemprice: { type:Number, required:true },
        imageUrl: { type:String },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;