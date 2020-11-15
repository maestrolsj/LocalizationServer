import { MutationUpsertProjectArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Project } from "src/db/entity/Project";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server";

export default async function (_: undefined, args: MutationUpsertProjectArgs) {
  const projectLocaleRepository = getRepository(Project);
  const where = omitBy(args.where, isNil);
  const data = omitBy(args.data, isNil);
  console.log(where);

  try {
    if (keys(args.where).length > 0) {
      await projectLocaleRepository.update(where, data);
      return await projectLocaleRepository.findOne(where);
    } else {
      return await projectLocaleRepository.save(data);
    }
  } catch (err) {
    console.log(err);
    return new ApolloError(err?.code === "23505" ? "UNIQUE" : "UNKNOWN");
  }
}
