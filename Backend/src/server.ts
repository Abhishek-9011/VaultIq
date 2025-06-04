import express from "express";
import { Request, Response } from "express";
import User from "./models/user.model.js";
import Content from "./models/content.model.js";
import Link from "./models/link.model.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import cors from 'cors'
import { JWT_PASSWORD } from "./config/Token.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./utils.js";
const app = express();
app.use(express.json());
app.use(cors());
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
  const { title, link, type } = req.body;
  try {
    await Content.create({
      title,
      link,
      type,
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

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  if (share) {
    //@ts-ignore
    const existingLink = await Link.findOne({ userId: req.userId });
    if (existingLink) {
      //@ts-ignore
      res.json({ hash: existingLink.hash });
      return;
    } else {
      const hash = random(10);
      await Link.create({
        hash: hash,
        //@ts-ignore
        userId: req.userId,
      });
      res.json({
        message: "/share/" + hash,
      });
    }
  } else {
    //@ts-ignore
    await Link.deleteOne({ userId: req.userId });
    res.json({
      message: "Removed Link",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await Link.findOne({ hash });
  if (!link) {
    res.status(403).json({
      message: "incorrect input",
    });
    return;
  }
  const content = await Content.findOne({ userId: link.userId });
  const user = await User.findOne({ _id: link.userId });
  res.json({
    //@ts-ignore
    username: user?.username,
    content: content,
  });
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
