import express from "express";
import { Request, Response } from "express";
import User from "./models/user.model.js";
import Content from "./models/content.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { JWT_PASSWORD } from "./config/Token.js";
import { userMiddleware } from "./middleware.js";
const app = express();
app.use(express.json());
async function connectDb() {
  try {
    await mongoose.connect(
      "mongodb+srv://abhishek774901:Jq3k8nyWi9zfxtS9@cluster0.xt6sa.mongodb.net/VaultIq"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection error:", error);
  }
}
connectDb();
app.post("/api/v1/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    await User.create({
      username,
      password,
    });
    res.json({ message: "user signed up succesfully" });
  } catch (error: any) {
    res.json({ message: "some error occured" + error.message });
  }
});
app.post("/api/v1/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username, password });
    if (existingUser) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        JWT_PASSWORD
      );
      res.json({ message: "user signed in successfully", token: token });
    }
  } catch (error: any) {
    res.json({ message: "some error occured" + error.message });
  }
});
app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const { title, link } = req.body;
  try {
    await Content.create({
      title,
      link,
      //
      // @ts-ignore
      userId: req.userId,
      tags: [],
    });
    res.json({ message: "content addes successfully" });
  } catch (error: any) {
    res.json({ message: "some error occured" + error.message });
  }
});
app.get("/api/v1/content", userMiddleware, async (req, res) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await Content.find({ userId }).populate("userId", "username");
  res.json({ content: content });
});
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body;

  await Content.deleteMany({
    contentId,
    //@ts-ignore
    userId: req.userId,
  });
  res.json({
    message: "content delelted successfully",
  });
});

app.get("/api/v1/brain/share", (req, res) => {
  const { name, email, password } = req.body;
});

app.get("/api/v1/brain/:shareLink", (req, res) => {
  const { name, email, password } = req.body;
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
