import { MutationUpsertScreenArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Screen } from "src/db/entity/Screen";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import omit from "lodash/omit";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server";

export default async function (_: undefined, args: MutationUpsertScreenArgs) {
  const screenLocaleRepository = getRepository(Screen);
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
