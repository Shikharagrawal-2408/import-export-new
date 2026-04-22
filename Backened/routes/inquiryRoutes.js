const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");

const { protect, admin } = require("../middleware/authMiddleware");
const adminEmailOnly = require("../middleware/adminEmailMiddleware");

/* ======================
   CREATE an Inquiry
   POST /api/inquiries
====================== */
router.post('/', async (req, res) => {
    try {
        const inquiry = await Inquiry.create(req.body);
        res.status(201).json(inquiry);
    } catch (error) {
        console.error("CREATE INQUIRY ERROR:", error);
        res.status(400).json({ message: error.message });
    }
});

/* ======================
   GET All Inquiries (ADMIN ONLY)
   GET /api/inquiries
====================== */
router.get('/', protect, admin, async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        console.error("GET INQUIRIES ERROR:", error);
        res.status(500).json({ message: "Server error" });
    }
});

/* ======================
   UPDATE inquiry status (ADMIN ONLY)
   PUT /api/inquiries/:id/status
====================== */
router.put(
    "/:id/status",
    protect,
    admin,
    async (req, res) => {

        // DB-safe allowed values
        const allowedStatuses = ["pending", "in progress", "resolved"];

        try {
            let { status } = req.body;

            if (!status) {
                return res.status(400).json({
                    message: "Status is required"
                });
            }

            // 🔒 STRONG NORMALIZATION
            const normalizedStatus = status
                .toLowerCase()
                .replace(/-/g, " ")
                .replace(/\s+/g, " ")
                .trim();

            if (!allowedStatuses.includes(normalizedStatus)) {
                return res.status(400).json({
                    message: "Invalid status"
                });
            }

            const inquiry = await Inquiry.findById(req.params.id);

            if (!inquiry) {
                return res.status(404).json({
                    message: "Inquiry not found"
                });
            }

            // ✅ Save exactly as enum expects
            inquiry.status = normalizedStatus;

            const updatedInquiry = await inquiry.save();

            return res.json(updatedInquiry);

        } catch (error) {
            console.error("UPDATE STATUS ERROR:", error);
            return res.status(500).json({
                message: "Server error"
            });
        }
    }
);

module.exports = router;
