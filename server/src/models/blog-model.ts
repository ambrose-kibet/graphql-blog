import { Schema, model, Model, Types, InferSchemaType } from "mongoose";

const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true, maxlength: 1000 },
    coverImage: { type: String, required: true },
    description: { type: String, required: true, maxlength: 1000 },
    content: { type: String, required: true },
    status: { type: String, enum: ["draft", "publish"], default: "draft" },
    author: { type: Types.ObjectId, required: true, ref: "User" },
    featured: { type: Boolean, default: false },
    tags: { type: [String], required: true },
  },
  { timestamps: true }
);

export default model("Post", postSchema);
