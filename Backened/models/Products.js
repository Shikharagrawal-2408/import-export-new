const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        specifications: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
            min: [0, "Price cannot be negative"]
        },
        imageUrl: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^(https?:\/\/.*\.(png|jpg|jpeg|webp|svg))$/i,
                "Please provide a valid image URL"
            ]
        }
    },
    {
        timestamps: true
    }
);
productSchema.index({
    productName: "text",
    category: "text"
});

module.exports = mongoose.model("Product", productSchema);
