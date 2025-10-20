const mongoose = require("mongoose");

const connestDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
    }
    catch (err){
        console.error("MongoDB connection Fialed")
        process.exit(1);
    }
};
module.exports = connestDB;