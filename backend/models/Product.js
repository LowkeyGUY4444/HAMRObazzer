const mongoose = require("mongoose");

// const productSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required: true,
//         trim: true,
//     },
//     description:{
//         type: String,
//         required: true,
//     },
//     price:{
//         type: Number,
//         required: true,  
//     },
//     discountPrise:{
//         type: Number,
//     },
//     countInStock:{
//         type: Number,
//         required: true,
//         default: 0,
//     },
//     sku:{
//         type: String,
//         required: true,
//         unique: true,
//     },
//     category:{
//         type: String,
//         required: true,
//     },
//     brand:{
//         type: String,
//     },
//     sizes:{
//         type: [String],
//         required: true,
//     },
//     colors:{
//         type: [String],
//         required: true,
//     },
//     collections:{
//         type: String,
//         required: true,
//     },
//     material:{
//         type: [String],
//     },
//     gender:{
//         type: String,
//         enum: ["Men","Women","Uinsex"],
//     },
//     images:[{
//         url:{
//             type: String,
//             require: true,
//         },
//         altTest:{
//             type: String,
//         },
//     },],
//     isFeatured:{
//         type: Boolean,
//         default: false,
//     },
//     isPublished:{
//         type: Boolean,
//         default: false,
//     },
//     rating:{
//         type: Number,
//         default: 0,
//     },
//     numReviews:{
//         type: Number,
//         default: 0,
//     },
//     tags:[String],
//     user:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         require: true
//     },
//     metaTitle:{
//         type: String,
//     },
//     metaDescription:{
//         type: String,
//     },
//     metaKeywords:{
//         type: Number,
//         default: 0,
//     },
//     // dimensions:{
//     //     type: Number,
//     //     width: Number,
//     //     height: Number,
//     // },
//      dimensions: { 
//     length: { type: Number },
//     width: { type: Number },
//     height: { type: Number }
//   },
//     weight:{
//         type: Number,
//     },
// },
// {timestamps: true}
// );

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountPrice: { type: Number },
  countInStock: { type: Number, required: true, default: 0 },
  sku: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  brand: { type: String },
  sizes: { type: [String], required: true },
  colors: { type: [String], required: true },
  collections: { type: String, required: true },
  material: { type: [String] },
  gender: { type: String, enum: ["Men", "Women", "Unisex"] }, // ✅ fixed typo & enum
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String },
    },
  ],
  isFeatured: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  metaTitle: { type: String },
  metaDescription: { type: String },
  metaKeywords: { type: [String] },
  dimensions: {                      // ✅ changed to object
    length: { type: Number },
    width: { type: Number },
    height: { type: Number }
  },
  weight: { type: Number }
}, { timestamps: true });




module.exports= mongoose.model("Product", productSchema);


