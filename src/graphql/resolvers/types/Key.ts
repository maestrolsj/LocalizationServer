import { getRepository } from "typeorm";
import { Translation } from "src/db/entity/Translation";

export default {
  translations: async ({ id }: any) =>
    await getRepository(Translation).find({
      where: { key: { id } },
      relations: ["locale", "key"],
    }),
};
