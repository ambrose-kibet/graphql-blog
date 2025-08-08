import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from "graphql";
import { IContext, IUser, IBlog, IComment } from "../../utils/types";

const userType = new GraphQLObjectType<IUser, IContext>({
  name: "UserType",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    fullName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    avatar: { type: GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLNonNull(GraphQLString) },
  }),

  description: "User type for GraphQL schema",
});

const blogType = new GraphQLObjectType<IBlog, IContext>({
  name: "BlogType",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    title: { type: GraphQLNonNull(GraphQLString) },
    content: { type: GraphQLNonNull(GraphQLString) },
    coverImage: { type: GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLNonNull(GraphQLString) },
    status: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: GraphQLNonNull(userType),
      resolve: (parent, args, context) => {
        return context.userLoader.load(parent.authorId);
      },
    },
    featured: { type: GraphQLBoolean },
    tags: { type: new GraphQLList(GraphQLString) },
  }),

  description: "Blog type for GraphQL schema",
});

const commentType = new GraphQLObjectType<IComment, IContext>({
  name: "CommentType",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLNonNull(GraphQLString) },
    author: {
      type: GraphQLNonNull(userType),
      resolve: (parent, args, context) => {
        return context.userLoader.load(parent.authorId);
      },
    },
    post: {
      type: GraphQLNonNull(blogType),
      resolve: (parent, args, context) => {
        return context.blogLoader.load(parent.postId);
      },
    },
  }),

  description: "Comment type for GraphQL schema",
});

export { userType, blogType, commentType };
