import { getRepository } from "typeorm";
import { QueryI18nextArgs } from "src/generated/graphql";
import { Project } from "src/db/entity/Project";

export default async function (_: undefined, args: QueryI18nextArgs) {
  const projectRepository = getRepository(Project);
  try {
    const project = await projectRepository.findOneOrFail({
      where: { key: args.key },
      relations: [
        "screens",
        "locales",
        "screens.keys",
        "screens.keys.screen",
        "screens.keys.translations",
        "screens.keys.translations.locale",
      ],
    });

    return project.locales.reduce(
      (acc, i) => ({
        ...acc,
        [i.code]: {
          translation: project.screens.reduce(
            (acc1, i1) => ({
              ...acc1,
              [`${i1.key}`]: i1.keys.reduce(
                (acc2, i2) => ({
                  ...acc2,
                  [`${i2.name}${
                    i2.plural ? "_plural" : ""
                  }`]: i2.translations.filter(
                    (i3) => i3.locale.code === i.code
                  )[0]?.value,
                }),
                {}
              ),
            }),
            {}
          ),
        },
      }),
      {}
    );
  } catch (err) {
    console.log(err);
  }
}
