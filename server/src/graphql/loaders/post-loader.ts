import DataLoader from "dataloader";
import Blog from "../../models/blog-model";
import { IBlog } from "../../utils/types";
import { Types } from "mongoose";

const postLoader = () =>
  new DataLoader<string, IBlog | null>(async (ids) => {
    const posts = await Blog.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
    const postMap: Record<string, IBlog | null> = {};
    posts.forEach((post) => {
      postMap[post._id as unknown as string] = post as unknown as IBlog;
    });

    return ids.map((id) => postMap[id] || null);
  });
export default postLoader;
