import { Request, Response } from "express";
import { IUser } from "./types";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const createJwt = (user: IUser): string => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not defined");
  }
  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 60 * 60 * 2, // 2 hours in seconds
    }
  );
  return token;
};

export const attachResToCookie = (payload: IUser, res: Response) => {
  const accessTokenJwt = createJwt(payload);
  const twoHours = 1000 * 60 * 60 * 2;
  const twoWeeks = twoHours * 24 * 7;
  res.cookie("accessToken", accessTokenJwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + twoHours),
  });
};

export const verifyJwt = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
};
export const getUserFromCookie = (req: Request): IUser | null => {
  const token = req.cookies?.accessToken;
  if (!token) return null;

  const decoded = verifyJwt(token);
  if (!decoded) return null;

  return {
    _id: decoded.userId,
    fullName: decoded.fullName,
    email: decoded.email,
    avatar: "", // Assuming avatar is not part of the JWT payload
    role: decoded.role,
  };
};
