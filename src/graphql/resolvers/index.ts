import { GraphQLDateTime } from "graphql-iso-date";
import GraphQLJSON from "graphql-type-json";

import { GraphQLScalarType } from "graphql";

import upsertTranslation from "./Mutation/upsertTranslation";
import deleteKey from "./Mutation/deleteKey";
import upsertKey from "./Mutation/upsertKey";
import upsertLocale from "./Mutation/upsertLocale";
import upsertScreen from "./Mutation/upsertScreen";
import upsertProject from "./Mutation/upsertProject";
import deleteProject from "./Mutation/deleteProject";
import upsertUser from "./Mutation/upsertUser";
import resetPassword from "./Mutation/resetPassword";
import forgotPassword from "./Mutation/forgotPassword";

import test from "./Query/test";
import i18next from "./Query/i18next";
import key from "./Query/key";
import locale from "./Query/locale";
import screen from "./Query/screen";
import project from "./Query/project";
import projects from "./Query/projects";
import screens from "./Query/screens";
import login from "./Query/login";
import translation from "./Query/translation";

import Project from "./types/Project";
import Screen from "./types/Screen";
import Key from "./types/Key";
import Translation from "./types/Translation";

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description:
    "Parsing iso formated dates and dates in milliseconds from 1.1.70 00:00",
  serialize: (value) => {
    if (typeof value === "number") {
      return GraphQLDateTime.serialize(value / 1000);
    }
    return GraphQLDateTime.serialize(value);
  },
  parseValue: (value) => {
    if (typeof value === "number") {
      return GraphQLDateTime.parseValue(value / 1000);
    }
    return GraphQLDateTime.parseValue(value);
  },
  extensions: GraphQLDateTime.extensions,
  astNode: GraphQLDateTime.astNode,
  extensionASTNodes: GraphQLDateTime.extensionASTNodes,
});

export default {
  DateTime,
  Project,
  Screen,
  Key,
  Translation,
  JSON: GraphQLJSON,
  Mutation: {
    upsertUser,
    upsertProject,
    resetPassword,
    upsertScreen,
    upsertLocale,
    upsertKey,
    upsertTranslation,
    deleteKey,
    deleteProject,
    forgotPassword,
  },
  Query: {
    test,
    projects,
    project,
    login,
    screens,
    screen,
    locale,
    key,
    translation,
    i18next,
  },
};
