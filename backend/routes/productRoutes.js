 const express = require("express");
 const Product= require("../models/Product");
 const { protect, admin } = require("../middleware/authMiddleware");

 const router= express.Router();

 // @route Post /api/products
 // @desc Create a new Product
 // @access Private /Admin

 router.post("/",protect, admin,  async(req,res)=>{
    try{
        const{
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        }=req.body;

        const product=new Product(
            {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user: req.user._id,// refreance to yhe admin user who created the product
        }
        );
        const createdProduct=await product.save();
        res.status(201).json(createdProduct);
    } catch(error){
        console.error(error);
        res.status(500).send("Server Error");

    }
 });

 // @route PUT /api/product/:id
 // @desc UPDATE an existing product ID
 // @ access Private/Admin
router.put("/:id",protect,admin,async(req,res)=>{
    try{
        const{
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
        }=req.body;

        // find product by ID
        const product=await Product.findById(req.params.id);
        if(product){
            //Update product filds
            product.name=name||product.name;
            product.description=description||product.description;
            product.price=price||product.price;
            product.discountPrice=discountPrice||product.discountPrice;
            product.countInStock=countInStock||product.countInStock
            product.category=category||product.category;
            product.brand=brand||product.brand;
            product.sizes=sizes||product.sizes;
            product.colors=colors||product.colors;
            product.collections=collections||product.collections;
            product.material=material||product.material;
            product.gender=gender||product.gender;
            product.images=images||product.images;
            product.isFeatured=isFeatured !== undefined? isFeatured:product.isFeatured;
            product.isPublished=isPublished !== undefined? isPublished:product.isPublished;
            product.tags=tags||product.tags;
            product.dimensions=dimensions||product.dimensions;
            product.weight=weight||product.weight;
            product.sku=sku||product.sku;

            //save the updated product
            const updatedProduct=await product.save();
            res.json(updatedProduct);  
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Server Error")
    }
});

//to delete  /api/producy/:ID.....access private/admin
router.delete("/:id",protect,admin,async(req,res)=>{
    try{
        //Find product By ID
        const product=await Product.findById(req.params.id);

        if(product){
            //Remove the product from DB
            await product.deleteOne();
            res.json({message:"Product removed"});
        }else{
            res.status(404).json({message:"Product not found"});
        }

    }catch(error){
        console.error(error);
        res.status(500).json({message:"Server Error"});
    }
});

// @route GET /api/products,,,,GET all product from DB with quary filter,,, @access public
router.get("/",async(req,res)=>{
    try{
        const{collection,size,color,gender,minPrice,maxPrice,sortBy,search,category,material,brand,limit}=req.query;
        let quary={};

        //filter logic
        if(collection&&collection.toLocaleLowerCase()!=="all"){
            quary.collections=collection;
        }
        if(category&&category.toLocaleLowerCase()!=="all"){
            quary.category=category;
        }
        if(material){
            quary.material={$in: material.split(",")};
        }
        if(brand){
            quary.brand={$in: brand.split(",")};
        }
        if(size){
            quary.sizes={$in: size.split(",")};
        }
        if(color){
            quary.colors={$in: [color]};
        }
        if(gender){
            quary.gender=gender;
        }
        if(minPrice||maxPrice){
            quary.price={};
            if(minPrice) quary.price.$gte=Number(minPrice);
            if(maxPrice) quary.price.$lte=Number(maxPrice);
        }
        if(search){
            quary.$or=[{name:{$regex:search,$options:"i"}}, {description:{$regex:search,$options:"i"}}]
        }
        
        //short logic
        let sort={};
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                     sort={price: 1};
                    break;
                case "priceDesc":
                     sort={price:-1};
                    break;
                case "popularity":
                     sort={rating: -1};
                    break;
                default:
                    break;
            }
        }

        //fetch product and apply shorting and limit
        let products= await Product.find(quary)
        .sort(sort)
        .limit(Number(limit)||0);
        res.json(products);
    }catch(error){
        console.error(error);
        res.status(500).send("Server error")
    }
});


// @route GET /api/products/best-sellers,,,,GET best selling products,,, @access public
router.get("/best-seller",async(req,res)=>{
    try{
        const bestSeller=await Product.findOne().sort({rating: -1});
        if (bestSeller){
                res.json(bestSeller);  
            }
            else{
                res.status(404).json({message:"No Best-Seller found"});
            }
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route GET /api/products/new-arrivals,,,,GET 8 new arrival products based on creation date,,, @access public
router.get("/new-arrivals",async(req,res)=>{
    try{
        const newArrivals=await Product.find().sort({createdAt: -1}).limit(8);
        if (newArrivals) {
            res.json(newArrivals);
        } else {
            res.status(404).json({message:"No New Arrivals found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route GET /api/products/:id,,,,GET a single product by ID,,, @access public
router.get("/:id",async(req,res)=>{
    try{
        const product=await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else{
            res.status(404).json({message:"Product not found"});
        }
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
});

// @route GET /api/products/similar/:id,,,,GET similar products by category and gender,,, @access public
router.get("/similar/:id",async(req,res)=>{

    const{id}=req.params;
    try{
        const product=await Product.findById(id);
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        const similarProducts=await Product.find({
            _id:{$ne:id},  // it Exclude the current product
            category:product.category,
            gender:product.gender
        }).limit(4); // Limit to 4 similar products
        res.json(similarProducts);
    
    }catch(error){
        console.error(error);
        res.status(500).send("Server error");
    }
});



module.exports = router;



