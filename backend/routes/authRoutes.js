const express = require('express');
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Register User
router.post("/register",async (req,res) => {
    try{ 
        const { firstname, lastname, businessname, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if(userExists){
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({ firstname, lastname, businessname, email, password });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    }catch(error){
        res.status(500).json({ message: "register form error" });
    }
});

// login User
router.post("/login",async (req,res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate JWT token
        const token = jwt.token = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, user });
    }catch(error){
        res.status(500).json({ message: "login form error" });
    }
});

module.exports = router;

