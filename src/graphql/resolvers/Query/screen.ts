import { getRepository } from "typeorm";
import { Screen } from "../../../db/entity/Screen";
import { QueryScreenArgs } from "src/generated/graphql";

export default async function (_: undefined, args: QueryScreenArgs) {
  const screenRepository = getRepository(Screen);
  return await screenRepository.findOne({ id: args.where.id });
}
