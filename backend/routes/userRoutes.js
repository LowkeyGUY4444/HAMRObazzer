const express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { protect }= require("../middleware/authMiddleware");
const router = express.Router();

// @route POST /apt/user/register
// @desc Register a new uaer

router.post("/register",async(req, res)=>{

    const {name, email, password}= req.body;

    try{
        //Registration logic
        //res.send({name, email, password});
        let user = await User.findOne({email});

        if (user) return res.status(400).json({message:"User alrady exists!"})

        user= new User({name, email, password});
        await user.save();

        // res.status(201).json({
        //     user:{
        //         _id: user._id,
        //         name: user.name,
        //         email: user.email,
        //         role: user.role,
        //     }
        // });


        // create JWT payload
        const payload ={user: {id: user._id, role: user.role}};
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"40h"},
            (err, token)=>{
                if (err) throw err;

                //Send the user and token in responce
                res.status(201).json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                })
            }
        );
    }
    catch(error){
        console.log(error);
        res.status(500).send("Server Error")
    }
});


// @route POST/api/users
// @desc Authentication user
// @access public
router.post("/login",async(req, res) =>{
    const{email, password}=req.body;

    try{
        //find user by email
        let user= await User.findOne({email});

        if(!user) return res.status(400).json({message:"User not found with this email"});
        const isMatch= await user.matchPassword(password);
        
        if(!isMatch)
            return res.status(400).json({message:"Invalid Password"});

        // create JWT payload
        const payload ={user: {id: user._id, role: user.role}};
        jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"40h"},
            (err, token)=>{
                if (err) throw err;

                //Send the user and token in responce
                res.json({
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    },
                    token,
                })
            }
        );

    }catch(error){
        console.error(error);
        res.status(500).send("server Error");
    }
});

// @route GEt /api/user/profile
//@description GET logged-in user's profile (protected Route)
// @access will be PRIVATE
router.get("/profile",protect, async(req, res)=>{
    res.json(req.user);
});

module.exports = router;

