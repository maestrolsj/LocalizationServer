import { getRepository } from "typeorm";
import { Translation } from "src/db/entity/Translation";
import { Locale } from "src/db/entity/Locale";
import { Key } from "src/db/entity/Key";

export default {
  locale: async ({ locale }: any) =>
    await getRepository(Locale).findOne(locale.id),
  key: async ({ key }: any) => await getRepository(Key).find(key.id),
};
