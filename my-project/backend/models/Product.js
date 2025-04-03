const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price:{type:Number},
    condition: { type: String },
    imageUrl: { type: String },
    claimed: { type: Boolean, default: false },
    claimedBy: { type: String, default: null }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
