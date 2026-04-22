const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        qty: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1']
        },
        price: {
            type: Number,
            required: true,
            min: [0, 'Price cannot be negative']
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        },
        clientName: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
            default: 'Processing',
            index: true
        },
        trackingId: {
            type: String,
            default: '-',
            trim: true
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: [
                (v) => v.length > 0,
                'Order must contain at least one item'
            ]
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0,
            min: [0, 'Total price cannot be negative']
        }
    },
    {
        timestamps: true
    }
);
orderSchema.pre('save', function (next) {
    this.totalPrice = this.items.reduce(
        (acc, item) => acc + item.qty * item.price,
        0
    );
    next();
});

orderSchema.index({ createdAt: -1 });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
