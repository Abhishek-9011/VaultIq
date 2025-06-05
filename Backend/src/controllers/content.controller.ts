import { JWT_PASSWORD } from "../config/Token";
import Content from "../models/content.model";
import User from "../models/user.model";

export const addContent = async (req: any, res: any) => {
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
};

export const getContent = async (req: any, res: any) => {
  //@ts-ignore
  const userId = req.userId;
  const content = await Content.find({ userId }).populate("userId", "username");
  res.json({ content: content });
};

export const deleteContent = async (req: any, res: any) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "contentId is required" });
    }

    const result = await Content.deleteOne({
      _id: contentId,
      //@ts-ignore
      userId: req.userId,
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Content not found or not owned by user" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting content",
      //@ts-ignore
      error: error.message,
    });
  }
};
