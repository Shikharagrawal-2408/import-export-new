const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

/* ======================
   @desc    Create new order
   @route   POST /api/orders
   @access  Private
====================== */
router.post('/', protect, async (req, res) => {
    try {
        const { clientName, items } = req.body;

        if (!clientName || !items || items.length === 0) {
            return res.status(400).json({ message: 'Invalid order data' });
        }

        const order = await Order.create({
            user: req.user._id,
            clientName,
            items
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* ======================
   @desc    Get logged-in user orders
   @route   GET /api/orders/my
   @access  Private
====================== */
router.get('/my', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   @desc    Get all orders
   @route   GET /api/orders
   @access  Private/Admin
====================== */
router.get('/', protect, admin, async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.page) || 1;

        const orders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        const count = await Order.countDocuments();

        res.json({
            orders,
            page,
            pages: Math.ceil(count / pageSize)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   @desc    Update order status
   @route   PUT /api/orders/:id/status
   @access  Private/Admin
====================== */
router.put('/:id/status', protect, admin, async (req, res) => {
    const allowedStatuses = [
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
    ];

    try {
        const { status, trackingId } = req.body;

        if (status && !allowedStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid order status' });
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (status) order.status = status;
        if (trackingId) order.trackingId = trackingId;

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
