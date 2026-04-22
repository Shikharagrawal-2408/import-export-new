/**
 * Restrict access strictly to admin@trade.com
 * Even if user has admin role, Gmail / sensitive admin features
 * are allowed ONLY for this email
 */

const adminEmailOnly = (req, res, next) => {
    try {
        // Safety check
        if (!req.user || !req.user.email) {
            return res.status(401).json({
                message: "User authentication required"
            });
        }

        // Normalize email for comparison
        const userEmail = req.user.email.toLowerCase().trim();
        const allowedAdminEmail = "admin@trade.com";

        // Strict email check
        if (userEmail !== allowedAdminEmail) {
            return res.status(403).json({
                message: "Only admin@trade.com is allowed to access this resource"
            });
        }

        // ✅ Authorized
        next();

    } catch (error) {
        console.error("ADMIN EMAIL MIDDLEWARE ERROR:", error);
        return res.status(500).json({
            message: "Server error in admin email verification"
        });
    }
};

module.exports = adminEmailOnly;
