import express from "express";
import axios from "axios";
import Search from "../models/Search.js";

const router = express.Router();

router.post("/search", async (req, res) => {
  const { term, userId } = req.body;
  if (!term || !userId) return res.status(400).json({ message: "Missing term or userId" });

  await Search.create({ userId, term });

  const response = await axios.get(`https://api.unsplash.com/search/photos`, {
    params: { query: term, per_page: 12 },
    headers: { Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}` }
  });

  res.json(response.data.results);
});

router.get("/history/:userId", async (req, res) => {
  const history = await Search.find({ userId: req.params.userId }).sort({ timestamp: -1 });
  res.json(history);
});

router.get("/top-searches", async (req, res) => {
  const top = await Search.aggregate([
    { $group: { _id: "$term", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.json(top);
});

export default router;
