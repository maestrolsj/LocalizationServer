//@ts-nocheck
import languages from "../languages.json";
import keys from "lodash/keys";
import { Project } from "./db/entity/Project";
import { Locale } from "./db/entity/Locale";
import iso from "iso-639-1";
import { Screen } from "./db/entity/Screen";
import { Key } from "./db/entity/Key";
import { Translation } from "./db/entity/Translation";
import { User } from "./db/entity/User";
import * as password from "./authentication/password";

export const seed = async (connection) => {
  const parsedTranslations = keys(languages).map((code) => {
    return {
      name: code,
      screens: keys(languages[code]).map((screen) => ({
        screen,
        keys: keys(languages[code][screen]).map((key) => ({
          name: key,
          value: languages[code][screen][key],
        })),
      })),
    };
  });

  const user = await connection
    .getRepository(User)
    .findOne({ email: "bruno.borges@softgarden.de" });
  if (!user) {
    connection.getRepository(User).save({
      firstName: "Bruno",
      lastName: "Borges",
      email: "bruno.borges@softgarden.de",
      password: await password.encrypt("1234"),
    });
  }

  const isProject = await connection
    .getRepository(Project)
    .findOne({ key: "MOBILE" });

  if (!isProject) {
    const project = await connection
      .getRepository(Project)
      .save({ key: "MOBILE", name: "JH APP", description: "" });

    for (const i of parsedTranslations) {
      const locale = await connection.getRepository(Locale).save({
        name: iso.getName(i.name),
        nativeName: iso.getNativeName(i.name),
        code: i.name,
        project: { id: project.id },
      });
      for (const x of i.screens) {
        let screen = await connection
          .getRepository(Screen)
          .findOne({ key: x.screen });
        if (!screen) {
          screen = await connection.getRepository(Screen).save({
            key: x.screen,
            name: x.screen,
            description: "",
            project: { id: project.id },
          });
        }
        for (const y of x.keys) {
          let key = await connection
            .getRepository(Key)
            .findOne({ name: y.name });
          if (!key) {
            key = await connection.getRepository(Key).save({
              name: y.name,
              screen: { id: screen?.id },
              plural: y.name.includes("_plural") ? true : false,
            });
          }
          typeof y.value === "object" ? console.log(x.screen, y.value) : null;
          await connection.getRepository(Translation).save({
            locale: { id: locale.id },
            key: { id: key.id },
            value: typeof y.value === "string" ? y.value : "",
          });
        }
      }
    }
  }
};
