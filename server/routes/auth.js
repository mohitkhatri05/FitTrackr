// server/routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
const router = express.Router();
import verifyToken from "../middlewares/verifyToken.js";

// Signup route
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully", userId: newUser._id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token  = jwt.sign(
      {userId: user._id},process.env.JWT_SECRET,
            {expiresIn: "1h"}
    )

    res.status(200).json({ message: "Login successful", userId: user._id , token:token});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
