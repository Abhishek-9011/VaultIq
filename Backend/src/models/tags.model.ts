import mongoose, { Schema } from "mongoose";
const tagSchema = new Schema({
  tag: { type: String, required: true , unique:true},
});
const Tag = mongoose.model('Tag', tagSchema);
export default Tag;