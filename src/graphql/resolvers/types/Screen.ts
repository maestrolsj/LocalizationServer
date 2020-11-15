import { getRepository } from "typeorm";
import { Key } from "src/db/entity/Key";

export default {
  keys: async ({ id }: any) =>
    await getRepository(Key).find({ screen: { id } }),
};
