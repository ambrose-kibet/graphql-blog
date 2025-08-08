import mongoose from "mongoose";
import { Model, Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  _id: mongoose.Types.ObjectId;
}
export interface IUserMethods {
  checkPassWord(candidatePassword: string): Promise<boolean>;
}

type IUserModel = Model<IUser, {}, IUserMethods>;
const userSchema: Schema<IUser, IUserModel, IUserMethods> = new Schema({
  fullName: {
    type: String,
    required: [true, "please provide full name"],
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "please provide email"],
    unique: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: "Please provide a valid email",
    },
  },
  password: {
    type: String,
    required: [true, "please provide password"],
    minlength: 6,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/citadell/image/upload/v1694168832/chat-app/tmp-1-1694168816045_zoctu0.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
userSchema.methods.checkPassWord = async function (candidatePassword: string) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

const User = model<IUser, IUserModel>("User", userSchema);
export default User;
