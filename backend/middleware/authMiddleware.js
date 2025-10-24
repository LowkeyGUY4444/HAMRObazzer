const jwt= require("jsonwebtoken");
const User = require("../models/User");


// Middleware to protect routes

const protect = async(req, res, next)=>{
    let token;

    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ){
        try{
            token= req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user=await User.findById(decoded.user.id).select("-password");// Exclude password
            next();

        }catch(error){
            console.error("Token Varification Failed", error);
            res.status(401).json({message: "Not authorized, Token failed"});
        }
    } else{
         res.status(401).json({message: "Not authorized, Token not provided"});
    }
};

//middleWare to check if the user is a admin

const admin= (req, res, next)=>{
    if (req.user && req.user.role==="admin"){
        next();
    }else{
        res.status(403).json({message:"Not authorized! User is not an admin"});
    }
};

module.exports= { protect, admin }

