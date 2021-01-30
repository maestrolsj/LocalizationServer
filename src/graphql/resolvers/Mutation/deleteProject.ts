import { MutationDeleteProjectArgs } from "../../../generated/graphql";
import { getRepository } from "typeorm";
import { Project } from "src/db/entity/Project";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";
import { ApolloError } from "apollo-server";

export default async function (_: undefined, args: MutationDeleteProjectArgs) {
  const projectLocaleRepository = getRepository(Project);
  const data = omitBy(args.data, isNil);
  console.log(data);
  try {
    if (keys(data).length > 0) {
      const project = await projectLocaleRepository.findOne({
        where: { id: data.id },
      });
      console.log("founded project", project);
      const copiedProject = { ...project };

      await projectLocaleRepository.delete(data.id);

      return copiedProject;
    } else {
      return new ApolloError("projectID is not provided");
    }
  } catch (err) {
    console.log(err);
    return new ApolloError(err?.code === "23505" ? "UNIQUE" : "UNKNOWN");
  }
}
