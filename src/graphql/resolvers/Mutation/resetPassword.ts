import * as definePasswordTokenGenerator from "../../../authentication/definePasswordToken";
import * as passwordEncryption from "../../../authentication/password";
import { MutationResetPasswordArgs } from "../../../generated/graphql";
import { getRepository } from "typeorm";
import { User } from "../../../db/entity/User";
import { ApolloError } from "apollo-server";
import * as accessTokenGenerator from "../../../authentication/accessToken";

export default async function (
  _: undefined,
  { password, token }: MutationResetPasswordArgs
) {
  const userRepository = getRepository(User);
  try {
    const decoded = definePasswordTokenGenerator.decode(token);

    if (typeof decoded === "object") {
      await userRepository.update(
        { id: decoded.id },
        { password: await passwordEncryption.encrypt(password) }
      );
    }
    const user = await userRepository.findOneOrFail(decoded.id);

    return {
      user,
      accessToken: accessTokenGenerator.sign({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      }),
    };
  } catch (err) {
    console.log(err);
    if (err?.name === "TokenExpiredError") {
      return new ApolloError(
        "This link has expired, please click on forgot password again to get a new token in your email."
      );
    }
    return new ApolloError("Something went wrong");
  }
}
