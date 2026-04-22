const jwt = require("jsonwebtoken");
const User = require("../models/User");

/* ======================
   PROTECT ROUTE
====================== */
const protect = async (req, res, next) => {
    let token;

    // Check Authorization header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user to request
        req.user = await User.findById(decoded.id).select("-password");

        if (!req.user) {
            return res.status(401).json({ message: "User not found" });
        }

        next(); // ✅ MUST be called once
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

/* ======================
   ADMIN MIDDLEWARE
====================== */
const admin = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next(); // ✅ correct
    } else {
        return res.status(403).json({ message: "Admin access only" });
    }
};

module.exports = { protect, admin };
