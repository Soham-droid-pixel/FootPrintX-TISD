const Claim = require("../models/Claim");

// Get all claims
exports.getAllClaims = async (req, res) => {
    try {
        const claims = await Claim.findAll();
        res.status(200).json(claims);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Claim a product
exports.claimProduct = async (req, res) => {
    try {
        const { productId, userId } = req.body;
        const newClaim = await Claim.create({ productId, userId });
        res.status(201).json(newClaim);
    } catch (error) {
        res.status(400).json({ error: "Failed to claim product" });
    }
};
