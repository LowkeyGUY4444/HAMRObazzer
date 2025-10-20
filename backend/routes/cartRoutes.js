const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');
const { get } = require('mongoose');

const router = express.Router();

//Helper function to get a cart by userId or guestId
const getCart = async (userId, guestId) => {
    if (userId) {
        return await Cart.findOne({ user: userId });
    } else if (guestId) {
        return await Cart.findOne({ guestId });
    } else {
        return null;
    }
};

// @route POST /api/cart,,,,,,,,@desc Add product to cart for a guest or logged in user,,,,,,, Access  public
router.post('/', async (req, res) => {
    const { productId, quantity, size, color, guestId, userId } = req.body;
    try {
        const product = await Product.findById(productId);
        if (!product) return res.status(404).json({ message: "Product not found" });

        //To determine if the user is logged in or a guest
        let cart = await getCart(userId, guestId);

        //If the cart exists, update it
        if(cart) {
                const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);
        
            if (productIndex > -1) {
                //if the product exists in the cart, update the quantity
                cart.products[productIndex].quantity += quantity;
            }
            else {
                //if the product does not exist in the cart, add it
                cart.products.push({
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                });
            }
            cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
            await cart.save();
            res.status(200).json(cart);
       }
       else {
            //If the cart does not exist, create a new cart
            const newCart = await Cart.create({
                user: userId ? userId : undefined,
                guestId: guestId ? guestId : "guest_" + new Date().getTime(),
                products: [{
                    productId,
                    name: product.name,
                    image: product.images[0].url,
                    price: product.price,
                    size,
                    color,
                    quantity
                }],
                totalPrice: product.price * quantity,
            });
            res.status(201).json(newCart);
       }
    }catch (error) {
            console.error("Error adding to cart", error);
            res.status(500).json({ message: "Server Error" });
        }
    });


    // @route PUT /api/cart,,,,,,,,@desc Update product quantity in the cart for gurst or logged in user,,,,,,, Access  public
    router.put('/', async (req, res) => {
        const { productId, quantity, size, color, guestId, userId } = req.body;
        try {
            let cart = await getCart(userId, guestId);
            if (!cart) return res.status(404).json({ message: "Cart not found" });

            const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);
            if (productIndex > -1) {
                //update the quantity
                if (quantity > 0) {
                    cart.products[productIndex].quantity = quantity;
                } else {
                    cart.products.splice(productIndex, 1);//remove it, if quantity is 0
                }
                cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: "Product not found in cart" });
            }
        } catch (error) {
                    console.error("Error updating cart", error);
                    res.status(500).json({ message: "Server Error" });
                }
            });

    // @route DELETE /api/cart,,,,,,,,@desc remove a product from cart,,,,,,, Access  public
    router.delete('/', async (req, res) => {
        const { productId, size, color, guestId, userId } = req.body;
        try {
            let cart = await getCart(userId, guestId);
            if (!cart) return res.status(404).json({ message: "Cart not found" });
            const productIndex = cart.products.findIndex((p) => p.productId.toString() === productId && p.size === size && p.color === color);
            if (productIndex > -1) {
                cart.products.splice(productIndex, 1);
                cart.totalPrice = cart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                await cart.save();
                res.status(200).json(cart);
            } else {
                res.status(404).json({ message: "Product not found in cart" });
            }
        } catch (error) {
                    console.error("Error removing from cart", error);
                    res.status(500).json({ message: "Server Error" });
                }
        });

    // @route GET /api/cart,,,,,,,,@desc Get cart for a guest or logged in user,,,,,,, Access  public
    router.get('/', async (req, res) => {
        const { guestId, userId } = req.query;
        try {
            const cart = await getCart(userId, guestId);
            if(cart) {
                res.json(cart);
            } else {
                res.status(404).json({ message: "Cart not found" });
            }
        } 
        catch (error) {
                    console.error("Error fetching cart", error);
                    res.status(500).json({ message: "Server Error" });
        }
    });

    // @route POST /api/cart/merge,,,,,,,,@desc will merge the guest cart with the user cart on login,,,,,,, Access  public
    router.post('/merge', protect, async (req, res) => {
        const { guestId} = req.body;

        try {
            const guestCart = await Cart.findOne({ guestId });
            const userCart = await Cart.findOne({ user: req.user._id });
            if (guestCart) {
                if(guestCart.products.length === 0) {
                    return res.status(400).json({message: "Guest cart is empty" });
                }
                if (userCart) {
                    // Merge carts
                    guestCart.products.forEach((guestItem) => {
                        const ProductIndex = userCart.products.findIndex((item) =>
                            item.productId.toString() === guestItem.productId.toString() &&
                            item.size === guestItem.size &&
                            item.color === guestItem.color
                        );
                        if (ProductIndex > -1) {
                            // If the product exists in the user cart, update the quantity
                            userCart.products[ProductIndex].quantity += guestItem.quantity;
                        } else {
                            // If the product does not exist in the user cart, add it
                            userCart.products.push(guestItem);
                        }
                    });
                    userCart.totalPrice = userCart.products.reduce((acc, item) => acc + item.price * item.quantity, 0);
                    await userCart.save();

                    // Will Delete the guest cart after merging
                    try {
                        await Cart.findByIdAndDelete({guestId});

                    }catch (error) {
                        console.error("Error deleting guest cart", error);
                    }
                    res.status(200).json(userCart);
                }else {
                    // If the user have no existing cart, assign the guest cart to the user
                    guestCart.user = req.user._id;
                    guestCart.guestId = undefined; // Clear the guestId
                    await guestCart.save();
                    res.status(200).json(guestCart);
            }
        }else {
            if (userCart) { 
                //Guest cart has already been merged return user cart
                return res.status(200).json(userCart);
            }
            res.status(404).json({ message: "No cart to merge" });
        }
        
        } catch (error) {
        console.error("Error merging carts", error);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;