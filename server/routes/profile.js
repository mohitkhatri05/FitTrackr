// server/routes/profile.js
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/user.js";


const router = express.Router();
router.get("/", (req, res) => {
  res.json({
    name: "Mohit Khatri",
    age: 19,
    email: "mohit@example.com"
  });
});
// Protected route
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password"); // don't send password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile fetched successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
// router.get('/profile', verifyToken, (req, res) => {
//   res.json({ username: req.user.username, email: req.user.email });
// });

export default router;
