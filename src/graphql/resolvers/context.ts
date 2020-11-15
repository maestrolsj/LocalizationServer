import { ExpressContext } from "apollo-server-express/dist/ApolloServer";
import { User } from "src/generated/graphql";
import * as accessTokenGenerator from "../../authentication/accessToken";
import { TokenPayload } from "src/authentication";

export interface Context {
  authorization: String;
  user: TokenPayload | undefined | null;
}

export default ({ req, res }: ExpressContext): Context => {
  const authorization = req.headers.authorization || "";
  let user: TokenPayload | undefined | null;
  try {
    user = accessTokenGenerator.decode(authorization.replace("Bearer ", ""));
  } catch (err) {}
  return {
    authorization,
    user,
  };
};
