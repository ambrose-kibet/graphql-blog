import DataLoader from "dataloader";
import Comment from "../../models/comment-model";
import { IComment } from "../../utils/types";
import { Types } from "mongoose";

const commentLoader = () =>
  new DataLoader<string, IComment | null>(async (ids) => {
    const comments = await Comment.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
    const commentMap: Record<string, IComment | null> = {};
    comments.forEach((comment) => {
      commentMap[comment._id as unknown as string] =
        comment as unknown as IComment;
    });

    return ids.map((id) => commentMap[id] || null);
  });

export default commentLoader;
