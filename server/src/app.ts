import express from "express";
import { graphqlHTTP } from "express-graphql";
import cors from "cors";
import cookieParser from "cookie-parser";
import schema from "./graphql";
import "dotenv/config";
import connectDB from "./db/connect";
import { commentLoader, postLoader, userLoader } from "./graphql/loaders";
import { getUserFromCookie } from "./utils/cookies";
import { RequestWithUser } from "./utils/types";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(
  "/graphql",
  graphqlHTTP((req, res) => {
    const user = getUserFromCookie(req as express.Request);
    (req as RequestWithUser).user = user;

    return {
      schema,
      graphiql: true,
      context: {
        req,
        res,
        commentLoader: commentLoader(),
        userLoader: userLoader(),
        postLoader: postLoader(),
      },
    };
  })
);

app.get("/", (req, res) => {
  res.send("GraphQL server is running on <a href='/graphql'>/graphql</a>");
});

const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL!);
    app.listen(PORT, () => {
      console.log(
        `Server is listening on port http://localhost:${PORT}/graphql`
      );
    });
  } catch (error) {
    console.log(error);
  }
};

start();
