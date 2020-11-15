import { getRepository } from "typeorm";
import { Project } from "../../../db/entity/Project";
import { QueryProjectsArgs } from "src/generated/graphql";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

export default async function (_: undefined, args: QueryProjectsArgs) {
  const projectRepository = getRepository(Project);
  const where = omitBy(args.where, isNil);
  return await projectRepository.find(where);
}
