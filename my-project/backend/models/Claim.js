const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    claimedAt: { type: Date, default: Date.now }
});

const Claim = mongoose.model("Claim", claimSchema);
module.exports = Claim;
