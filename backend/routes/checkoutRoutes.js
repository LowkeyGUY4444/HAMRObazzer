const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Order= require('../models/Order');
const Checkout = require('../models/Checkout');

const router = express.Router();

// @ routePOST /api/checkout,,,,,,,,@desc Create a new order from the cart,,,,,,, Access  private

// router.post('/', protect, async (req, res) => {
//     const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;
//     if(!checkoutItems || checkoutItems.length === 0){
//         return res.status(400).json({ message: "No items to checkout" });
//     }
//     try {
//         const newCheckout = await Checkout.create({
//             user: req.user._id,
//             checkoutItems: checkoutItems,
//             shippingAddress,
//             paymentMethod,
//             totalPrice,
//             paymentStatus: "Pending",
//             isPaid: false,
//         });
//         console.log(`Checkout created for user: ${req.user._id}`);
//         res.status(201).json(newCheckout);

//     }catch (error) {
//         console.error("Error creating checkout", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// })

// @route POST /api/checkout
// @desc Create a new checkout (auto-finalize if COD)
// @access Private
router.post('/', protect, async (req, res) => {
  const { checkoutItems, shippingAddress, paymentMethod, totalPrice } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items to checkout" });
  }

  try {
    // ✅ Step 1: Create checkout
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "COD" : "Pending",
      isPaid: paymentMethod === "Cash on Delivery" ? false : undefined,
      isFinalized: paymentMethod === "Cash on Delivery" ? true : false,
      finalizeAt: paymentMethod === "Cash on Delivery" ? new Date() : undefined,
    });

    // ✅ Step 2: If COD, instantly create Order
    if (paymentMethod === "Cash on Delivery") {
      await Order.create({
        user: req.user._id,
        orderItems: checkoutItems,
        shippingAddress,
        paymentMethod,
        totalPrice,
        isPaid: false,
        isDelivered: false,
        paymentStatus: "Cash on Delivery",
      });

      // ✅ Optional: Delete user’s cart
      await Cart.findOneAndDelete({ user: req.user._id });
    }

    console.log(`Checkout created for user: ${req.user._id}`);
    res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error creating checkout", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// @route PUT/api/checkout/:id/pay,,,,,,,,@desc Update checkout to mark as paid after payment is successful,,,,,,, Access  private

router.put('/:id/pay', protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id);

        if(!checkout){
            return res.status(404).json({ message: "Checkout not found" });
        }
        if(paymentStatus === "paid"){
            checkout.isPaid = true;
            checkout.paidAt = Date.now();
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            await checkout.save();

            res.status(200).json({ message: "Checkout marked as paid", checkout });
        } else{
            res.status(400).json({ message: "Invalid payment status" });
        }
    }
    catch (error) {
        console.error("Error updating checkout payment status", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// // @route POST /api/checkout/:id/finalize,,,,,,,,@desc Finalize the checkout and create an order after payment confirmation,,,,,,, Access  private
// router.post('/:id/finalize', protect, async (req, res) => {
//     try {
//         const checkout = await Checkout.findById(req.params.id);

//         if(!checkout){
//             return res.status(404).json({ message: "Checkout not found" });
//         }
//         if (checkout.isPaid && !checkout.isFinalized){
//             //Create final order based on the checkout details
//             const finalOrder= await Order.create({
//                 user: checkout.user,
//                 orderItems: checkout.checkoutItems,
//                 shippingAddress: checkout.shippingAddress,
//                 paymentMethod: checkout.paymentMethod,
//                 totalPrice: checkout.totalPrice,
//                 isPaid: true,
//                 paidAt: checkout.paidAt,
//                 isDelivered: false,
//                 paymentStatus: "paid",
//                 paymentDetails: checkout.paymentDetails,
//             });
//             //mark checkout as finalized
//             checkout.isFinalized= true;
//             checkout.finalizeAt= Date.now();
//             await checkout.save();
//             //Delete the user's cart after finalizing the order
//             await Cart.findOneAndDelete({ user: checkout.user });
//             res.status(201).json(finalOrder);
//         }else if(checkout.isFinalized){
//             res.status(400).json({ message: "Checkout already finalized" });
//         }else{
//             res.status(400).json({ message: "Checkout not paid" });
//         }
//     }
//     catch (error) {
//         console.error("Error finalizing checkout", error);
//         res.status(500).json({ message: "Server Error" });
//     }
// });

router.post('/:id/finalize', protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);

    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    // Ensure user owns this checkout
    if (checkout.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to finalize this checkout" });
    }

    console.log("Finalize checkout:", {
      id: checkout._id,
      isPaid: checkout.isPaid,
      isFinalized: checkout.isFinalized,
      paymentMethod: checkout.paymentMethod,
    });

    if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    }

    let finalOrder;

    // ✅ CASE 1: Paid (Paypal, etc.)
    if (checkout.isPaid) {
      finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });
    }
    // ✅ CASE 2: Cash on Delivery
    else if (checkout.paymentMethod === "Cash on Delivery") {
      finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: false,
        isDelivered: false,
        paymentStatus: "Cash on Delivery",
      });
    } else {
      return res.status(400).json({ message: "Checkout not paid and not COD" });
    }

    // ✅ Mark checkout finalized & delete cart
    checkout.isFinalized = true;
    checkout.finalizeAt = new Date();
    await checkout.save();

    await Cart.findOneAndDelete({ user: checkout.user });

    console.log("Checkout finalized successfully ✅");

    res.status(201).json(finalOrder);
  } catch (error) {
    console.error("Error finalizing checkout", error);
    res.status(500).json({ message: "Server Error" });
  }
});







module.exports = router;

