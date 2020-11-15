import { getRepository } from "typeorm";
import { Translation } from "../../../db/entity/Translation";
import { QueryTranslationArgs } from "src/generated/graphql";

export default async function (_: undefined, args: QueryTranslationArgs) {
  return await getRepository(Translation).findOne({ id: args.where.id });
}
