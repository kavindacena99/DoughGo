const express = require('express');
const protect = require('../middlewares/authMiddleware');
const Driver = require('../model/Driver');

const router = express.Router();

router.post("/adddriver", protect, async(req,res) => {
    try{
        const { drivername, vehiclenumber, accesscode } = req.body;

        const sellerId = req.user;

        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }

        const newDriver = new Driver({ drivername, vehiclenumber, accesscode, seller: sellerId});

        const saveDriver = await newDriver.save();
        res.status(201).json(saveDriver);
    }catch(err){
        res.status(500).json({ message: 'Error creating food item', error: err.message });
    }
});

router.get("/getdrivers", protect, async(req,res) => {
    try{
        const sellerId = req.user;

        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }

        const drivers = await Driver.find({ seller: sellerId });

        if(!drivers || drivers.length === 0){
            return res.status(404).json({ message: 'No drivers found for this seller' });
        }

        res.status(200).json(drivers);

    }catch(err){
        res.status(500).json({ message: 'Error fetching drivers', error: err.message });
    }
});

module.exports = router;