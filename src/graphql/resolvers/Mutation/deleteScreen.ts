import { MutationDeleteScreenArgs } from "src/generated/graphql";
import { getRepository } from "typeorm";
import { Screen } from "src/db/entity/Screen";
import { ApolloError } from "apollo-server-express";
import keys from "lodash/keys";
import omitBy from "lodash/omitBy";
import isNil from "lodash/isNil";

export default async function (_: undefined, args: MutationDeleteScreenArgs) {
  const screenLocaleRepository = getRepository(Screen);
  const data = omitBy(args.data, isNil);

  try {
    if (keys(data).length > 0) {
      const screen = await screenLocaleRepository.findOne({
        where: { id: data.id },
      });
      console.log("founded screen", screen);
      const copiedScreen = { ...screen };
      const result = await screenLocaleRepository.delete({ id: data.id });
      console.log(result);
      return null;
    } else {
      return new ApolloError("screenID is not provided");
    }
  } catch (error) {
    console.log(error);
  }
}
