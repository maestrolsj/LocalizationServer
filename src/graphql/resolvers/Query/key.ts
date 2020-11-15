import { getRepository } from "typeorm";
import { Key } from "../../../db/entity/Key";
import { QueryKeyArgs } from "src/generated/graphql";

export default async function (_: undefined, args: QueryKeyArgs) {
  const keyRepository = getRepository(Key);
  return await keyRepository.findOne({ id: args.where.id });
}
