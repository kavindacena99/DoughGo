const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema(
    {
        drivername: { type:String, required:true },
        vehiclenumber: { type:String, required:true},
        accesscode: { type:String, required:true },
        seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    },
    { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;