import { shield } from "graphql-shield";
import isAuthenticated from "./isAuthenticated";
import isPublic from "./isPublic";

const permissions = shield({
  Query: {
    "*": isPublic,
    login: isPublic,
    i18next: isPublic,
    project: isPublic,
    test: isPublic,
  },
  Mutation: {
    "*": isPublic,
    upsertUser: isPublic,
    resetPassword: isPublic,
    forgotPassword: isPublic,
  },
});

export default permissions;
