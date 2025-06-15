const express = require('express');
const protect = require('../middlewares/authMiddleware');
const Item = require('../model/Item');
const multer = require('multer');
const upload = require('../middlewares/upload');

const router = express.Router();

router.post("/additem", protect, upload.single('image'), async (req,res) => {
    try{
        const { itemname, itemweight, itemprice } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        
        const sellerId = req.user; // Assuming req.user contains the ID of the logged-in user

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

module.exports = router;