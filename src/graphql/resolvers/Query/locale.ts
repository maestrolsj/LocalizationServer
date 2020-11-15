import { getRepository } from "typeorm";
import { Locale } from "../../../db/entity/Locale";
import { QueryLocaleArgs } from "src/generated/graphql";

export default async function (_: undefined, args: QueryLocaleArgs) {
  return await getRepository(Locale).findOne({ id: args.where.id });
}
