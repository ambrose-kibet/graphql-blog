import { GraphQLID, GraphQLList } from "graphql";
import { userType } from "../schemas"; // Adjust the import path as necessary
import User from "../../models/user-model";
import { IContext } from "../../utils/types";

const queries = {
  users: {
    type: new GraphQLList(userType),
    resolve: async (_parent: any, _args: any, context: IContext) => {
      // add Autorization check if needed

      try {
        return await User.find({});
      } catch (error) {
        throw new Error("Error fetching users: " + (error as Error).message);
      }
    },
  },

  user: {
    type: userType,
    args: { id: { type: GraphQLID } },
    resolve: async (
      _parent: any,
      args: { [argName: string]: string },
      context: IContext
    ) => {
      try {
        return await User.findById(args.id);
      } catch (error) {
        throw new Error("Error fetching user: " + (error as Error).message);
      }
    },
  },
  me: {
    type: userType,
    resolve: async (_parent: any, _args: any, context: IContext) => {
      if (!context.req.user) {
        throw new Error("Not authenticated");
      }
      try {
        return await User.findById(context.req.user._id);
      } catch (error) {
        throw new Error("Error fetching user: " + (error as Error).message);
      }
    },
  },
};

export { queries as userQueries };
