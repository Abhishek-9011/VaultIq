import express from "express";
import mongoose from "mongoose";
import User from "./models/user.model";

const app = express();
app.use(express.json())
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, password });

    return res.status(201).json({ message: "User successfully signed up", user: newUser });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
});
app.post("/ap1/v1/content", (req, res) => {
  const { name, email, password } = req.body;
});
app.get("/ap1/v1/content", (req, res) => {
  const { name, email, password } = req.body;
});
app.delete("/ap1/v1/content", (req, res) => {
  const { name, email, password } = req.body;
});
app.get("/ap1/v1/brain/:shareLink", (req, res) => {
  const { name, email, password } = req.body;
});
app.listen(3000);
