import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import "./auth.js"; // passport config

import searchRoutes from "./routes/search.js";
import userRoutes from "./routes/user.js";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));
app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

app.use("/api", searchRoutes);
app.use("/auth", userRoutes);

app.get("/", (req, res) => res.send("Server running..."));

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
