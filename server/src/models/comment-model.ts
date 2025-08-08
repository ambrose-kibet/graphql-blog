import { Schema, model, Model, Types, InferSchemaType } from "mongoose";

const commentSchema: Schema = new Schema(
  {
    content: { type: String, required: true, maxlength: 1000 },
    postId: { type: Types.ObjectId, required: true, ref: "Post" },
    authorId: { type: Types.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true }
);

export default model("Comment", commentSchema);
