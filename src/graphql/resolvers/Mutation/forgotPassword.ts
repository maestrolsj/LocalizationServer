import { MutationForgotPasswordArgs } from "../../../generated/graphql";
import { getRepository } from "typeorm";
import { User } from "../../../db/entity/User";
import * as definePasswordTokenGenerator from "../../../authentication/definePasswordToken";
import { ApolloError, UserInputError } from "apollo-server";
import { sendResetPasswordMail } from "src/mailer";

export default async function (_: undefined, args: MutationForgotPasswordArgs) {
  try {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email: args.email } });
    if (!isEmail(args.email ?? "") || !isSoftgardenEmail(args.email ?? "")) {
      return new UserInputError("Must be a softgarden email.");
    }
    if (!user) {
      return new ApolloError("User not found");
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    sendResetPasswordMail({
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      token: definePasswordTokenGenerator.sign(payload),
    });
  } catch (err) {
    console.log(err);
    return new ApolloError(err.message);
  }
}

const isEmail = (email: string) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const isSoftgardenEmail = (email: string) =>
  email.split("").reverse().slice(0, 14).reverse().join("") ===
  "@softgarden.de";
