const express = require('express');
const User = require('../model/User');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const protect = require('../middlewares/authMiddleware');
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

        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // generate JWT token
        const token = jwt.sign({ userId: user._id },process.env.JWT_SECRET,{ expiresIn: "7d" });

        res.status(200).json({ message: "Login successful", token, user });
    }catch(error){
        console.error("Login error:", error);
        res.status(500).json({ message: "login form error" });
    }
});

// Get current user profile
router.get("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

// Update current user profile
router.put("/profile", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { firstname, lastname, businessname, email, password } = req.body;

        if (firstname) user.firstname = firstname;
        if (lastname) user.lastname = lastname;
        if (businessname) user.businessname = businessname;
        if (email) user.email = email;
        if (password) user.password = password;

        await user.save();

        res.json({ message: "Profile updated successfully", user: user.toObject({ getters: true, virtuals: false }) });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;

