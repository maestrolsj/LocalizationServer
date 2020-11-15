import "module-alias/register";
import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import { createConnection, Connection } from "typeorm";

import { ApolloServer } from "apollo-server";
import _ from "lodash";

import typeDefs from "./graphql/typeDefs";
import { makeExecutableSchema } from "graphql-tools";
import { applyMiddleware } from "graphql-middleware";

import resolvers from "./graphql/resolvers";
import permissions from "./graphql/permissions";
import context from "./graphql/resolvers/context";

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

createConnection()
  .then(async (connection: Connection) => {
    const server = new ApolloServer({
      schema,
      context,
      debug: process.env.NODE_ENV === "development",
      plugins: [
        {
          requestDidStart: () => {
            return {
              didEncounterErrors: (requestContext) => {
                // const {errors, source, operationName} = requestContext;
                // logger.error("Encountered errors during \"%s\"", operationName);
                // logger.info("Source \"%s\"", source);
                // for (const error of errors) {
                //   logger.error(error);
                // }
              },
            };
          },
        },
      ],
    });

    server.listen({ port: process.env.PORT }).then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  })
  .catch((error: any) => console.log(error));
