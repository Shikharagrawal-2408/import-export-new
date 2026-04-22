const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email address"
            ]
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        country: {
            type: String,
            required: true,
            trim: true
        },
        serviceType: {
            type: String,
            required: true,
            enum: [
                "Import Management",
                "Export Management",
                "Export Support",
                "Supply Chain",
                "Logistics",
                "Customs Clearance",
                "Customs Consulting",
                "Quality Inspection",
                "Freight Forwarding",
                "Other"
            ]
        },
        message: {
            type: String,
            required: true,
            trim: true,
            minlength: 2
        },
        status: {
            type: String,
            enum: ["pending", "in progress", "resolved"],
            default: "pending"
        }
    },
    { timestamps: true }
);

inquirySchema.index({ email: 1 });
inquirySchema.index({ status: 1 });

module.exports = mongoose.model("Inquiry", inquirySchema);
