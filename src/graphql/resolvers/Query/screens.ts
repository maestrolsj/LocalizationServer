import { getRepository } from "typeorm";
import { Screen } from "../../../db/entity/Screen";
import { QueryScreensArgs } from "src/generated/graphql";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

export default async function (_: undefined, args: QueryScreensArgs) {
  const screenRepository = getRepository(Screen);
  const where = omitBy(args.where, isNil);
  return await screenRepository.find(where);
}
