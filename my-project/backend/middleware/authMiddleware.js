const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const verified = jwt.verify(token.split(" ")[1], "secretKey");
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
};