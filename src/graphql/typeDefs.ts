import gql from "graphql-tag";

export default gql`
  scalar DateTime
  scalar JSON

  type Query {
    login(email: String!, password: String!): AuthenticationPayload
    projects(where: ProjectsWhereInput): [Project!]!
    project(where: ProjectWhereInput!): Project!
    screens(where: ScreensWhereInput): [Screen!]!
    screen(where: ScreenWhereInput!): Screen!
    locale(where: LocaleWhereInput!): Locale!
    key(where: KeyWhereInput!): Key!
    translation(where: TranslationWhereInput!): Translation!
    i18next(key: String!): JSON
    test: String!
  }

  type Mutation {
    deleteProject(data: DeleteProjectDataInput!): Project
    upsertTranslation(
      data: UpsertTranslationDataInput!
      where: UpsertTranslationWhereInput
    ): Translation
    upsertKey(data: UpsertKeyDataInput!, where: UpsertKeyWhereInput): Key
    deleteKey(where: DeleteKeyWhereInput!): Boolean
    upsertLocale(
      data: UpsertLocaleDataInput!
      where: UpsertLocaleWhereInput
    ): Locale
    upsertUser(data: UpsertUserDataInput!, where: UpsertUserWhereInput): User
    upsertProject(
      data: UpsertProjectDataInput!
      where: UpsertProjectWhereInput
    ): Project
    deleteProject(
      data: DeleteProjectDataInput!
    ): Project
    upsertScreen(
      data: UpsertScreenDataInput!
      where: UpsertScreenWhereInput
    ): Project
    resetPassword(password: String!, token: String!): AuthenticationPayload
    forgotPassword(email: String!): Boolean
  }

  input ProjectsWhereInput {
    id: ID
  }

  input ProjectWhereInput {
    id: ID
    key: String
  }

  input KeyWhereInput {
    id: ID!
  }

  input DeleteKeyWhereInput {
    id: ID!
  }

  input TranslationWhereInput {
    id: ID!
  }

  input ScreensWhereInput {
    projectId: ID
  }

  input ScreenWhereInput {
    id: ID!
  }
  input LocaleWhereInput {
    id: ID!
  }

  input UpsertProjectDataInput {
    key: String!
    name: String!
    description: String!
  }

  input DeleteProjectDataInput {
    id: ID!
  }

  input UpsertProjectWhereInput {
    id: ID
  }

  input UpsertTranslationDataInput {
    value: String!
    keyId: ID!
    localeId: ID!
  }

  input UpsertTranslationWhereInput {
    id: ID
  }

  input UpsertKeyDataInput {
    name: String!
    plural: Boolean!
    screenId: ID!
  }

  input UpsertKeyWhereInput {
    id: ID
  }

  input UpsertLocaleDataInput {
    name: String!
    nativeName: String!
    code: String!
    projectId: ID!
  }

  input UpsertLocaleWhereInput {
    id: ID
  }
  input UpsertScreenDataInput {
    key: String!
    name: String!
    description: String!
    projectId: ID!
  }

  input UpsertScreenWhereInput {
    id: ID
  }

  input UpsertUserDataInput {
    firstName: String!
    lastName: String!
    email: String!
  }

  input UpsertUserWhereInput {
    id: ID
    email: String!
  }

  type AuthenticationPayload {
    accessToken: String!
    user: User!
  }

  type Key {
    id: ID!
    name: String!
    screen: Screen!
    translations: [Translation!]!
    plural: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Locale {
    id: ID!
    name: String!
    nativeName: String!
    code: String!
    project: Project!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Project {
    id: ID!
    key: String!
    name: String!
    description: String!
    screens: [Screen!]!
    locales: [Locale!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Screen {
    id: ID!
    key: String!
    name: String!
    description: String!
    project: Project!
    keys: [Key!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Translation {
    id: ID!
    value: String!
    locale: Locale!
    key: Key!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }
`;
