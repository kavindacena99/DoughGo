const express = require('express');
const protect = require('../middlewares/authMiddleware');
const Customer = require('../model/Customer');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/registercustomer", async(req,res) => {
    try{
        const { firstname,lastname,phonenumber,address,email,password } = req.body;

        const newCustomer = new Customer({ firstname,lastname,phonenumber,address,email,password });

        const saveCustomer = await newCustomer.save();
        res.status(201).json(saveCustomer);
    }catch(err){
        res.status(500).json({ message: 'Error creating customer', error: err.message });
    }
});

router.post("/logincustomer",async (req,res)=>{
    try{
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email });
        
        if(!customer){
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await customer.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate JWT token
        const token = jwt.sign({ userId: customer._id },process.env.JWT_SECRET,{ expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, customer });
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "login form error" });
    }
});

module.exports = router;