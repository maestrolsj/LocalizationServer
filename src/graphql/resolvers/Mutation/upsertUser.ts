import { ApolloError, UserInputError } from "apollo-server";
import isNil from "lodash/isNil";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import { sendResetPasswordMail } from "src/mailer";
import { getRepository } from "typeorm";
import * as definePasswordTokenGenerator from "../../../authentication/definePasswordToken";
import { User } from "../../../db/entity/User";
import { MutationUpsertUserArgs } from "../../../generated/graphql";

export default async function (_: undefined, args: MutationUpsertUserArgs) {
  const userRepository = getRepository(User);
  const where = omitBy(args.where, isNil);
  const data = omitBy(args.data, isNil);
  if (keys(args.where).length > 0) {
    await userRepository.update(where, data);
    return await userRepository.findOne(where);
  } else {
    if (!isEmail(data.email ?? "") || !isSoftgardenEmail(data.email ?? "")) {
      return new UserInputError("Must be a softgarden email.");
    }
    try {
      const user = await userRepository.save(data);
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
      // console.log(definePasswordTokenGenerator.sign(payload));
      return user;
    } catch (err) {
      console.log(err);
      return new ApolloError(err?.code === "23505" ? "UNIQUE" : "UNKNOWN");
    }
  }
}

const isEmail = (email: string) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const isSoftgardenEmail = (email: string) =>
  email.split("").reverse().slice(0, 14).reverse().join("") ===
  "@softgarden.de";
