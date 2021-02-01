import { MutationUpsertTranslationArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Translation } from "src/db/entity/Translation";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import omit from "lodash/omit";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server-express";

export default async function (
  _: undefined,
  args: MutationUpsertTranslationArgs
) {
  const keyLocaleRepository = getRepository(Translation);
  const key = { id: args.data.keyId };
  const locale = { id: args.data.localeId };
  const where = omitBy(args.where, isNil);
  const data = omit(omitBy({ ...args.data, key, locale }, isNil), [
    "keyId",
    "localeId",
  ]);
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
