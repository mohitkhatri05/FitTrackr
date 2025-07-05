
// ✅ routes/profile.js
import express from "express";
import verifyToken from "../middlewares/verifyToken.js";
import User from "../models/user.js";
import UserProfile from "../models/userProfile.js"; // Assuming you have a UserProfile model

const router = express.Router();

// ✅ GET /api/profile - Protected route to get user info
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Profile fetched", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/profile/update - Update or create profile for logged-in user
router.post("/update", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, gender } = req.body;
    console.log("updating profile for :", userId, name, gender);
    
    let profile = await UserProfile.findOne({ userId });
    if (profile) {
      profile.name = name;
      profile.gender = gender;
      await profile.save();
    } else {
      profile = new UserProfile({ userId, name, gender });
      await profile.save();
    }
    res.json({ message: "Profile updated", profile });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
});


// GET /api/profile/me - Get profile for logged-in user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const profile = await UserProfile.findOne({ userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json({ name: profile.name, gender: profile.gender });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ POST /api/profile/update - Update name and gender
router.get("/:userId", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({ userId: req.params.userId });
    if (!profile) return res.status(404).json({ message: "Profile not found" });
    res.json({
      name: profile.name,
      gender: profile.gender
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
