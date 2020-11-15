import { shield } from "graphql-shield";
import isAuthenticated from "./isAuthenticated";
import isPublic from "./isPublic";

const permissions = shield({
  Query: {
    "*": isAuthenticated,
    login: isPublic,
    i18next: isPublic,
    project: isPublic,
  },
  Mutation: {
    "*": isAuthenticated,
    upsertUser: isPublic,
    resetPassword: isPublic,
    forgotPassword: isPublic,
  },
});

export default permissions;
