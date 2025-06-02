import mongoose, { Schema, Types } from "mongoose";

const contentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, required: true },
  userId: { type: Types.ObjectId, ref: "User", required: true },
  type: { type: String },
  tags: [{ type: Types.ObjectId, ref: "Tag" }],
});
const Content = mongoose.model("Content", contentSchema);
export default Content;
