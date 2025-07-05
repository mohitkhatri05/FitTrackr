// ✅ index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";


// Routes
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes); 
app.use("/api/profile", profileRoutes); 


// Test route
app.get("/", (req, res) => {
  res.send("FitTrackr Backend Running");
});

// DB Connect and Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, { dbName: "fittrackr" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log("✅ MongoDB connected");
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB connection error:", err);
  });
