/*const express = require("express");
const router = express.Router();
const Claim = require("../models/Claim");
const Product = require("../models/Product");

module.exports = (io) => {
    router.post("/claim", async (req, res) => {
        const { productId } = req.body;

        try {
            const product = await Product.findById(productId);
            if (!product) return res.status(404).json({ success: false, message: "Product not found" });
            if (product.claimed) return res.status(400).json({ success: false, message: "Product already claimed" });

            const claim = new Claim({ product: productId });
            await claim.save();

            product.claimed = true;
            await product.save();

            // Emit real-time update
            io.emit("productClaimed", { productId, status: "Claimed" });

            res.json({ success: true, message: "Product claimed successfully!" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Server Error" });
        }
    });

    return router;
};
*/