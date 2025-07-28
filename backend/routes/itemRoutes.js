const express = require('express');
const protect = require('../middlewares/authMiddleware');
const Item = require('../model/Item');
const multer = require('multer');
const upload = require('../middlewares/upload');
const Load = require('../model/Load');

const router = express.Router();

router.post("/additem", protect, upload.single('image'), async (req,res) => {
    try{
        const { itemname, itemweight, itemprice } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const sellerId = req.user; 
        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }
        
        const newItem = new Item({ itemname, itemweight, itemprice, imageUrl, seller: sellerId });

        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    }catch(err){
        res.status(500).json({ message: 'Error creating food item', error: err.message });
    }
});

router.get("/getitems", protect, async(req,res) => {
    try{
        const sellerId = req.user;

        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }

        const items = await Item.find({ seller: sellerId });

        if(!items || items.length === 0){
            return res.status(404).json({ message: 'No items found for this seller' });
        }

        res.status(200).json(items);

    }catch(err){
        res.status(500).json({ message: 'Error fetching items', error: err.message });
    }
});

router.post("/loaditems",protect, async (req, res) => {
  try {
    const { driverId, items } = req.body;

    const sellerId = req.user;

    if (!sellerId) {
      return res.status(401).json({ message: "Unauthorized, no seller ID provided" });
    }

    if (!driverId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ message: "Driver ID and items are required" });
    }

    const newLoad = new Load({ driverId, items, sellerId });
    const savedLoad = await newLoad.save();

    return res
      .status(201)
      .json({ message: "Items loaded successfully", load: savedLoad });
  } catch (err) {
    console.error("Error loading items:", err);
    return res
      .status(500)
      .json({ message: "Error loading items", error: err.message });
  }
});

router.get("/getloads", protect, async(req,res) => {
    try{
        const sellerId = req.user;

        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }

        const loads = await Load.find({ sellerId }).populate('driverId').populate('items.itemId');

        if(!loads || loads.length === 0){
            return res.status(404).json({ message: 'No loads found for this seller' });
        }

        res.status(200).json(loads);
    }catch(err){
        res.status(500).json({ message: 'Error fetching drivers', error: err.message });
    }
});

router.delete("/resetloads",protect, async (req,res) => {
    try{
        const sellerId = req.user;

        if(!sellerId){
            return res.status(401).json({ message: 'Unauthorized, no seller ID provided' });
        }
        
        const deletedLoads = await Load.deleteMany({ sellerId });

        if(deletedLoads.deletedCount === 0){
            return res.status(404).json({ message: 'No loads found to reset' });
        }
        res.status(200).json({ message: 'All loads reset successfully', deletedCount: deletedLoads.deletedCount });
    }catch(err){
        res.status(500).json({ message: 'Error resetting loads', error: err.message });
    }
});

module.exports = router;