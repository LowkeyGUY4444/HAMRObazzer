const mongoose= require("mongoose");
const dotenv= require("dotenv");
const Product= require("./models/Product");
const User= require("./models/User");
const Cart= require("./models/Cart");
const products= require("./data/products");

dotenv.config();
// connect to mongoBD
mongoose.connect(process.env.MONGO_URI);

// Function to SEED data
const seedData= async()=>{
    try{
        // clear Existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();
        
        //create a default admin user
        const createdUser= await User.create({
            name: "Admin Usre",
            email: "admin@gmail.com",
            password: "123456",
            role:"admin"
        });

        // assign the default user ID to eact product
        const userID = createdUser._id;
        const sampleproduct= products.map((product)=>{
            return{...product, user:userID};
        });
        await Product.insertMany(sampleproduct);
        console.log("Product Data seeded successfilly!!!!!!!");
        process.exit();
    }catch(error){
        console.error("eror seeding the data",error);
        process.exit(1);
    }
};
seedData();
