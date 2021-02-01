import { MutationUpsertLocaleArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Locale } from "src/db/entity/Locale";
import keys from "lodash/keys";
import omit from "lodash/omit";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server-express";

export default async function (_: undefined, args: MutationUpsertLocaleArgs) {
  const screenLocaleRepository = getRepository(Locale);
  const project = { id: args.data.projectId };
  const where = omitBy(args.where, isNil);
  const data = omit(omitBy({ ...args.data, project }, isNil), "projectId");

  try {
    if (keys(args.where).length > 0) {
      await screenLocaleRepository.update(where, data);
      return await screenLocaleRepository.findOne(where);
    } else {
      return await screenLocaleRepository.save(data);
    }
  } catch (err) {
    console.log(err);
    return new ApolloError(err?.code === "23505" ? "UNIQUE" : "UNKNOWN");
  }
}
