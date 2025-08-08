import { Request, Response } from "express";
import DataLoader from "dataloader";

interface IUser {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  role: string;
}

interface IBlog {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  description: string;
  status: string;
  authorId: string;
  featured: boolean;
  tags: string[];
}
interface IComment {
  _id: string;
  content: string;
  authorId: string;
  postId: string;
}

export interface RequestWithUser extends Request {
  user: IUser | null;
}

export interface IContext {
  req: RequestWithUser;
  res: Response;
  userLoader: DataLoader<string, IUser | null>;
  blogLoader: DataLoader<string, IBlog | null>;
  commentLoader: DataLoader<string, IComment | null>;
}

export { IUser, IBlog, IComment };
