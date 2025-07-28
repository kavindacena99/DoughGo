const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const driverRoutes = require('./routes/driverRoutes');
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

const specialOrderRoutes = require('./routes/specialOrderRoutes');

// Routes
app.use("/api/auth",authRoutes);
app.use("/api/item",itemRoutes);
app.use("/api/driver",driverRoutes);
app.use("/api/specialorders", specialOrderRoutes);

// serve static files
app.use('/uploads', express.static('uploads'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});