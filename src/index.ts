import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import Express from "express";
import { applyMiddleware } from "graphql-middleware";
import { makeExecutableSchema } from "graphql-tools";
import "module-alias/register";
import path from "path";
import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
import permissions from "./graphql/permissions";
import resolvers from "./graphql/resolvers";
import context from "./graphql/resolvers/context";
import typeDefs from "./graphql/typeDefs";
import { seed } from "./seed";
import cors from "cors";
import fs from "fs";
import http from "http";
import https from "https";

// Load config
dotenv.config({ path: "./.env" });

const schema = applyMiddleware(
  makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
  permissions
);

const configurations = {
  production: { ssl: true, port: 443, hostname: "18.193.202.36" },
  development: { ssl: true, port: 443, hostname: "18.193.202.36" },
};

const environment = process.env.NODE_ENV || "production";

const config = configurations[environment];

createConnection()
  .then(async (connection: Connection) => {
    try {
      const apolloServer = new ApolloServer({
        schema,
        context,
        debug: true,
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
      // seed(connection);

      const app = Express();

      // Body parser
      app.use(Express.urlencoded({ extended: false }));
      app.use(Express.json());
      app.use(cors());

      // serving build file of client
      app.use("/", Express.static(path.join(__dirname, "../client/out")));
      apolloServer.applyMiddleware({
        app,
        cors: {
          credentials: true,
          origin: new RegExp("/*/"),
        },
      });

      const server = config.ssl
        ? https.createServer(
            {
              key: fs.readFileSync(
                path.join(__dirname, `../ssl/server.key`)
              ),
              cert: fs.readFileSync(
                path.join(__dirname, `../ssl/server.crt`)
              ),
            },
            app
          )
        : http.createServer(app);

      server.listen({ port: 443 }, () =>
        console.log(
          `🚀 Server ready at https://localhost:443${apolloServer.graphqlPath}`
        )
      );
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error: any) => console.log(error));
