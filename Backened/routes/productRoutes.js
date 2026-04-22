const express = require('express');
const router = express.Router();

const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

/* ======================
   ADD PRODUCT (Admin)
   POST /api/products/add
====================== */
router.post('/add', protect, admin, async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: 'Product data is required' });
        }

        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* ======================
   GET ALL PRODUCTS (Public)
   GET /api/products
====================== */
router.get('/', async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.page) || 1;
        const keyword = req.query.keyword
            ? {
                  productName: {
                      $regex: req.query.keyword,
                      $options: 'i'
                  }
              }
            : {};

        const count = await Product.countDocuments({ ...keyword });

        const products = await Product.find({ ...keyword })
            .sort({ createdAt: -1 })
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({
            products,
            page,
            pages: Math.ceil(count / pageSize)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   UPDATE PRODUCT (Admin)
   PUT /api/products/:id
====================== */
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        Object.assign(product, req.body);
        const updatedProduct = await product.save();

        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

/* ======================
   INVENTORY COUNT
   GET /api/products/count
====================== */
router.get('/count', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.json({ inventory: count });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/* ======================
   DELETE PRODUCT (Admin)
   DELETE /api/products/:id
====================== */
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.deleteOne();
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
