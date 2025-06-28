import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import profileRoutes from "./routes/profile.js"; // <-- ye line add karni thi bro 🔥
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes); // <-- ye line add karni thi bro 🔥
app.use("/api/profile", profileRoutes); // <-- ye line bhi add karni thi 🔥

app.get("/", (req, res) => {
  res.send("FitTrackr Backend Running");
});

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, { dbName: "fittrackr" })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log("MongoDB connected");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
