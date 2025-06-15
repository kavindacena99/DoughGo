const jwt = require('jsonwebtoken');

const protect = (req,res,next) => {
    try{
        const authHeader = req.header("Authorization");
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized, no token" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId; // Make sure this is consistent
        next();
    }catch(err){
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;
