const express = require('express');
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route GET /api/orders/myorders,,,,,,,,@desc Get orders for the logged in user,,,,,,, Access  private
router.get('/my-orders', protect, async (req, res) => {
    try {
        //Find orders for the logged in user
        console.log("Authenticated user:", req.user._id);
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
         console.log("Found orders:", orders);
        res.status(200).json(orders); 
    }
    catch (error) {
        console.error("Error fetching user orders", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @ route GET /api/orders/:id,,,,,,,,@desc Get order details by ID,,,,,,, Access  private
router.get('/:id', protect, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        // return full order details if the user is the owner of the order
        res.status(200).json(order);
    }
    catch (error) {
        console.error("Error fetching order details", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;