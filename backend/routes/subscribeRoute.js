const express = require('express');
const router = express.Router();
const Subscriber = require('../models/Subscriber');

// @route   POST /api/subscribe
// @desc    Subscribe a user to the newsletter
// @access  Public
router.post('/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Use let because we might reassign it later
        let subscriber = await Subscriber.findOne({ email });

        if (subscriber) {
            return res.status(400).json({ message: "Email already subscribed" });
        }

        // Create a new subscriber if it doesn't exist
        subscriber = new Subscriber({ email });
        await subscriber.save();

        console.log(`New subscriber added: ${email}`);
        res.status(201).json({ message: "Subscribed successfully to the newsletter!"});

    } catch (error) {
        console.error("Error subscribing user", error);
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;
