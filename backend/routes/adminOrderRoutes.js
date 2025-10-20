const express = require('express');
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// @route   GET /api/admin/orders,,,,,,,, get all orders (Admin only) @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email'); // Populate user details
        res.json(orders);
    }
    catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   PUT /api/admin/orders/:id,,,,, @desc    Update an order Status (Admin only) @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name");
        if (order) {
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;

            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: "Order not found" });
        }

    } catch (error) {
        console.error("Error updating order", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// @route   DELETE /api/admin/orders/:id,,,,, @desc    Delete an order by ID (Admin only) @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await order.deleteOne();
            res.json({ message: "Order deleted successfully" });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error deleting order", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
