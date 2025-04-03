const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // load environment variables from .env file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to mongoDB


// Test route
/*
app.get("/", (req,res)=>{
    res.send("API is running...");    
});
*/



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});