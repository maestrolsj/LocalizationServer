import { getRepository } from "typeorm";
import { Project } from "../../../db/entity/Project";
import { QueryProjectArgs } from "src/generated/graphql";

export default async function (_: undefined, args: QueryProjectArgs) {
  const projectRepository = getRepository(Project);
  if (args.where.id) {
    return await projectRepository.findOne({ id: args.where.id });
  }
  if (args.where.key) {
    return await projectRepository.findOne({ key: args.where.key });
  }
}
