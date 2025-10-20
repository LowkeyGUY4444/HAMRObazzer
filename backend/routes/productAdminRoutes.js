const express = require('express');
const product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/admin/products,,,,,,,, get all products (Admin only) @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const products = await product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;