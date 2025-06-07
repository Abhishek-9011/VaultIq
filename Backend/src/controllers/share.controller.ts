import Content from "../models/content.model";
import Link from "../models/link.model";
import User from "../models/user.model";
import { random } from "../utils";

export const generateShareLink = async (req: any, res: any) => {
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
};

export const getShareLink = async (req: any, res: any) => {
  const hash = req.params.shareLink;
  const link = await Link.findOne({ hash });
  if (!link) {
    res.status(403).json({
      message: "incorrect input",
    });
    return;
  }
  const content = await Content.find({ userId: link.userId });
  const user = await User.findOne({ _id: link.userId });
  res.json({
    //@ts-ignore
    username: user?.username,
    content: content,
  });
};
