const mongoose = require('mongoose');

const btobSchema = new mongoose.Schema(
    {
        moq: { type: String, trim: true },
        packaging: { type: String, trim: true },
        standards: { type: String, trim: true },
        incoterms: { type: String, trim: true },
        payment: { type: String, trim: true }
    },
    { _id: false }
);

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        image: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg))$/i,
                'Please provide a valid image URL'
            ]
        },
        category: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        specs: {
            type: Map,
            of: String,
            default: {}
        },
        btob: {
            type: btobSchema,
            default: {}
        },
        price: {
            type: Number,
            default: 0,
            min: [0, 'Price cannot be negative']
        }
    },
    {
        timestamps: true
    }
);
productSchema.index({
    name: 'text',
    category: 'text'
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
