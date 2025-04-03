const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");

// Function to calculate price based on realistic factors
const calculatePrice = (category, condition) => {
    let basePrice = 50; // Default base price

    const categoryPrices = {
        "Electronics": 200,
        "Furniture": 150,
        "Clothing": 50,
        "Books": 30,
        "Home Essentials": 100
    };
    basePrice = categoryPrices[category] || basePrice;

    if (condition === "New") basePrice *= 1.2;
    else if (condition === "Good") basePrice *= 1.0;
    else if (condition === "Fair") basePrice *= 0.7;
    else basePrice *= 0.5; // Poor condition

    return Math.round(basePrice);
};

// ✅ Add Product
router.post("/add", async (req, res) => {
    try {
        const { userId, name, description, category, condition, imageUrl } = req.body;
        // console.log("Received Product Data:", req.body); // Debugging line  
        

        if (!userId || !name || !category) {
            return res.status(400).json({ success: false, message: "User ID, Name, and Category are required" });
        }

        const price = calculatePrice(category, condition);
        // console.log(price);
        
        const product = new Product({ userId, name, description, category, condition, imageUrl,price, claimed: false });
        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully", data: product });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error adding product", error: error.message });
    }
});

// ✅ Get All Products (Both Claimed and Unclaimed)
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Get All Unclaimed Products
router.get("/unclaimed", async (req, res) => {
    try {
        const products = await Product.find({ claimed: false });
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error fetching unclaimed products:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Get Product by ID (Fixed Route)
router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;

        // Ensure ID is valid
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ success: false, message: "Invalid Product ID" });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Error fetching product details" });
    }
});

module.exports = router;
