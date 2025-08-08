import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQueries } from "./resolvers/users";
import { authMutations } from "./resolvers/auth";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQueries,

    // Add other queries here
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    ...authMutations,
  },
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default schema;
