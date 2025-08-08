import DataLoader from "dataloader";
import User from "../../models/user-model";
import { IUser } from "../../utils/types";
import { Types } from "mongoose";

const userLoader = () =>
  new DataLoader<string, IUser | null>(async (ids) => {
    const users = await User.find({
      _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
    });
    const userMap: Record<string, IUser | null> = {};
    users.forEach((user) => {
      userMap[user._id as unknown as string] = user as unknown as IUser;
    });

    return ids.map((id) => userMap[id] || null);
  });

export default userLoader;
