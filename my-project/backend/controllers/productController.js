const Product = require("../models/Product");

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await products.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    try {
        const { name, description, userId } = req.body;
        const imageUrl = req.file ? req.file.path : null;
        const newProduct = await Product.create({ name, description, imageUrl, userId });
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: "Failed to create product" });
    }
};
