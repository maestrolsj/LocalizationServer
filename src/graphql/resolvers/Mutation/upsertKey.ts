import { MutationUpsertKeyArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Key } from "src/db/entity/Key";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import omit from "lodash/omit";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server-express";

export default async function (_: undefined, args: MutationUpsertKeyArgs) {
  const keyLocaleRepository = getRepository(Key);
  const screen = { id: args.data.screenId };
  const where = omitBy(args.where, isNil);
  const data = omit(omitBy({ ...args.data, screen }, isNil), "screenId");
  try {
    if (keys(args.where).length > 0) {
      await keyLocaleRepository.update(where, data);
      return await keyLocaleRepository.findOne(where);
    } else {
      return await keyLocaleRepository.save(data);
    }
  } catch (err) {
    console.log(err);
    return new ApolloError(err?.code === "23505" ? "UNIQUE" : "UNKNOWN");
  }
}
