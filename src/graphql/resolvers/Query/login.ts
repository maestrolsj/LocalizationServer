import { QueryLoginArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { User } from "../../../db/entity/User";
import * as accessTokenGenerator from "../../../authentication/accessToken";
import * as passwordEncryption from "../../../authentication/password";
import { AuthenticationError } from "apollo-server";
import omit from "lodash/omit";

export default async function (_: undefined, args: QueryLoginArgs) {
  const { email, password } = args;
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email });
  if (user !== undefined) {
    if (await passwordEncryption.verify(password ?? "", user.password)) {
      const payload = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return {
        user: user,
        accessToken: accessTokenGenerator.sign(payload),
      };
    } else {
      return new AuthenticationError("Password incorrect.");
    }
  } else {
    return new AuthenticationError("User does not exist");
  }
}
