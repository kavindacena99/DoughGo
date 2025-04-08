const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const { default: mongoose } = require('mongoose');

dotenv.config(); // load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to mongoDB
mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log("Mongo DB connected"))
.catch((err) => console.log("Mongo DB error", err));


// Test route
/*
app.get("/", (req,res)=>{
    res.send("API is running...");    
});
*/

// Routes
app.use("/api/auth",authRoutes);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});