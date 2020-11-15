import { rule } from "graphql-shield";

export const isPublic = rule()(async (parent, args, ctx, info) => {
  return true;
});

export default isPublic;
