const express = require("express");
const bcrypt = require("bcryptjs"); // ✅ Secure password hashing
const User = require("../models/user");

const router = express.Router();

// ✅ GET All Users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // ✅ Don't send passwords in response
        res.json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching users", error: error.message });
    }
});

// ✅ POST Create User (with password hashing & duplicate check)
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        // ✅ Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // ✅ Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ success: true, message: "User created successfully", data: newUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error creating user", error: error.message });
    }
});

module.exports = router;
