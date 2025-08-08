import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLString } from "graphql";
import { userType } from "../schemas"; // Adjust the import path as necessary
import User from "../../models/user-model";
import { IContext } from "../../utils/types";
import { attachResToCookie } from "../../utils/cookies";
import e from "express";

const authMutations = {
  register: {
    type: userType,
    args: {
      fullName: { type: GraphQLNonNull(GraphQLString) },
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _parent: any,
      args: { [argName: string]: string },
      context: IContext
    ) => {
      try {
        const { fullName, email, password } = args;
        const user = new User({ fullName, email, password });
        await user.save();
        attachResToCookie(
          { ...user.toObject(), _id: user._id.toString() },
          context.res
        );
        return user;
      } catch (error) {
        throw new Error("Error registering user: " + (error as Error).message);
      }
    },
  },

  login: {
    type: userType,
    args: {
      email: { type: GraphQLNonNull(GraphQLString) },
      password: { type: GraphQLNonNull(GraphQLString) },
    },
    resolve: async (
      _parent: any,
      args: { [argName: string]: string },
      context: IContext
    ) => {
      try {
        const { email, password } = args;
        const user = await User.findOne({ email });
        if (!user || !(await user.checkPassWord(password))) {
          throw new Error("Invalid credentials");
        }

        attachResToCookie(
          { ...user.toObject(), _id: user._id.toString() },
          context.res
        );
        return user;
      } catch (error) {
        throw new Error("Error logging in user: " + (error as Error).message);
      }
    },
  },
};

export { authMutations };
