import { rule } from "graphql-shield";
import * as accessTokenGenerator from "../../authentication/accessToken";
import { AuthenticationError } from "apollo-server";

export const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  try {
    accessTokenGenerator.decode(ctx.authorization.replace("Bearer ", ""));
    return true;
  } catch (err) {
    return new AuthenticationError(err?.name ?? "UNAUTHORIZED");
  }
});

export default isAuthenticated;
