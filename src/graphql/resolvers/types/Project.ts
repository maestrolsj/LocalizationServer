import { getRepository } from "typeorm";
import { Screen } from "src/db/entity/Screen";
import { Locale } from "src/db/entity/Locale";

export default {
  screens: async ({ id }: any) =>
    await getRepository(Screen).find({ project: { id } }),
  locales: async ({ id }: any) =>
    await getRepository(Locale).find({ project: { id } }),
};
