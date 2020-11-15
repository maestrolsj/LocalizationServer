import { MutationDeleteKeyArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Key } from "src/db/entity/Key";

export default async function (_: undefined, args: MutationDeleteKeyArgs) {
  const keyLocaleRepository = getRepository(Key);
  keyLocaleRepository.delete({ id: args.where.id });
}
