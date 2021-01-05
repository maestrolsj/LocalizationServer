export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Parsing iso formated dates and dates in milliseconds from 1.1.70 00:00 */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};



export type Query = {
  __typename?: 'Query';
  login?: Maybe<AuthenticationPayload>;
  projects: Array<Project>;
  project: Project;
  screens: Array<Screen>;
  screen: Screen;
  locale: Locale;
  key: Key;
  translation: Translation;
  i18next?: Maybe<Scalars['JSON']>;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type QueryProjectsArgs = {
  where?: Maybe<ProjectsWhereInput>;
};


export type QueryProjectArgs = {
  where: ProjectWhereInput;
};


export type QueryScreensArgs = {
  where?: Maybe<ScreensWhereInput>;
};


export type QueryScreenArgs = {
  where: ScreenWhereInput;
};


export type QueryLocaleArgs = {
  where: LocaleWhereInput;
};


export type QueryKeyArgs = {
  where: KeyWhereInput;
};


export type QueryTranslationArgs = {
  where: TranslationWhereInput;
};


export type QueryI18nextArgs = {
  key: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  upsertTranslation?: Maybe<Translation>;
  upsertKey?: Maybe<Key>;
  deleteKey?: Maybe<Scalars['Boolean']>;
  upsertLocale?: Maybe<Locale>;
  upsertUser?: Maybe<User>;
  upsertProject?: Maybe<Project>;
  upsertScreen?: Maybe<Project>;
  resetPassword?: Maybe<AuthenticationPayload>;
};


export type MutationUpsertTranslationArgs = {
  data: UpsertTranslationDataInput;
  where?: Maybe<UpsertTranslationWhereInput>;
};


export type MutationUpsertKeyArgs = {
  data: UpsertKeyDataInput;
  where?: Maybe<UpsertKeyWhereInput>;
};


export type MutationDeleteKeyArgs = {
  where: DeleteKeyWhereInput;
};


export type MutationUpsertLocaleArgs = {
  data: UpsertLocaleDataInput;
  where?: Maybe<UpsertLocaleWhereInput>;
};


export type MutationUpsertUserArgs = {
  data: UpsertUserDataInput;
  where?: Maybe<UpsertUserWhereInput>;
};


export type MutationUpsertProjectArgs = {
  data: UpsertProjectDataInput;
  where?: Maybe<UpsertProjectWhereInput>;
};


export type MutationUpsertScreenArgs = {
  data: UpsertScreenDataInput;
  where?: Maybe<UpsertScreenWhereInput>;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  token: Scalars['String'];
};

export type ProjectsWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type ProjectWhereInput = {
  id?: Maybe<Scalars['ID']>;
  key?: Maybe<Scalars['String']>;
};

export type KeyWhereInput = {
  id: Scalars['ID'];
};

export type DeleteKeyWhereInput = {
  id: Scalars['ID'];
};

export type TranslationWhereInput = {
  id: Scalars['ID'];
};

export type ScreensWhereInput = {
  projectId?: Maybe<Scalars['ID']>;
};

export type ScreenWhereInput = {
  id: Scalars['ID'];
};

export type LocaleWhereInput = {
  id: Scalars['ID'];
};

export type UpsertProjectDataInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};

export type UpsertProjectWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertTranslationDataInput = {
  value: Scalars['String'];
  keyId: Scalars['ID'];
  localeId: Scalars['ID'];
};

export type UpsertTranslationWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertKeyDataInput = {
  name: Scalars['String'];
  plural: Scalars['Boolean'];
  screenId: Scalars['ID'];
};

export type UpsertKeyWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertLocaleDataInput = {
  name: Scalars['String'];
  nativeName: Scalars['String'];
  code: Scalars['String'];
  projectId: Scalars['ID'];
};

export type UpsertLocaleWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertScreenDataInput = {
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  projectId: Scalars['ID'];
};

export type UpsertScreenWhereInput = {
  id?: Maybe<Scalars['ID']>;
};

export type UpsertUserDataInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type UpsertUserWhereInput = {
  id?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
};

export type AuthenticationPayload = {
  __typename?: 'AuthenticationPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type Key = {
  __typename?: 'Key';
  id: Scalars['ID'];
  name: Scalars['String'];
  screen: Screen;
  translations: Array<Translation>;
  plural: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Locale = {
  __typename?: 'Locale';
  id: Scalars['ID'];
  name: Scalars['String'];
  nativeName: Scalars['String'];
  code: Scalars['String'];
  project: Project;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Project = {
  __typename?: 'Project';
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  screens: Array<Screen>;
  locales: Array<Locale>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Screen = {
  __typename?: 'Screen';
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  project: Project;
  keys: Array<Key>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Translation = {
  __typename?: 'Translation';
  id: Scalars['ID'];
  value: Scalars['String'];
  locale: Locale;
  key: Key;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type HomePage_ProjectsQueryVariables = {};


export type HomePage_ProjectsQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'key' | 'name' | 'description'>
  )> }
);

export type KeyFormModal_KeyQueryVariables = {
  id: Scalars['ID'];
};


export type KeyFormModal_KeyQuery = (
  { __typename?: 'Query' }
  & { key: (
    { __typename?: 'Key' }
    & Pick<Key, 'id' | 'name' | 'plural'>
  ) }
);

export type KeyFormModal_UpsertKeyMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  plural: Scalars['Boolean'];
  screenId: Scalars['ID'];
};


export type KeyFormModal_UpsertKeyMutation = (
  { __typename?: 'Mutation' }
  & { upsertKey?: Maybe<(
    { __typename?: 'Key' }
    & Pick<Key, 'id' | 'name' | 'plural'>
  )> }
);

export type LocaleFormModal_LocaleQueryVariables = {
  id: Scalars['ID'];
};


export type LocaleFormModal_LocaleQuery = (
  { __typename?: 'Query' }
  & { locale: (
    { __typename?: 'Locale' }
    & Pick<Locale, 'id' | 'name' | 'code' | 'nativeName'>
  ) }
);

export type LocaleFormModal_UpsertLocaleMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  nativeName: Scalars['String'];
  code: Scalars['String'];
  projectId: Scalars['ID'];
};


export type LocaleFormModal_UpsertLocaleMutation = (
  { __typename?: 'Mutation' }
  & { upsertLocale?: Maybe<(
    { __typename?: 'Locale' }
    & Pick<Locale, 'id' | 'name' | 'nativeName' | 'code'>
  )> }
);

export type ProjectFormModal_ProjectQueryVariables = {
  id: Scalars['ID'];
};


export type ProjectFormModal_ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'key' | 'name' | 'description'>
  ) }
);

export type ProjectFormModal_UpsertProjectMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
};


export type ProjectFormModal_UpsertProjectMutation = (
  { __typename?: 'Mutation' }
  & { upsertProject?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'key' | 'name' | 'description'>
  )> }
);

export type Screen_ProjectQueryVariables = {
  id: Scalars['ID'];
};


export type Screen_ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'key' | 'name' | 'description'>
    & { screens: Array<(
      { __typename?: 'Screen' }
      & Pick<Screen, 'id' | 'name'>
    )>, locales: Array<(
      { __typename?: 'Locale' }
      & Pick<Locale, 'id' | 'name'>
    )> }
  ) }
);

export type ScreenFormModal_ScreenQueryVariables = {
  id: Scalars['ID'];
};


export type ScreenFormModal_ScreenQuery = (
  { __typename?: 'Query' }
  & { screen: (
    { __typename?: 'Screen' }
    & Pick<Screen, 'id' | 'key' | 'name' | 'description'>
  ) }
);

export type ScreenFormModal_UpsertScreenMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  projectId: Scalars['ID'];
};


export type ScreenFormModal_UpsertScreenMutation = (
  { __typename?: 'Mutation' }
  & { upsertScreen?: Maybe<(
    { __typename?: 'Project' }
    & Pick<Project, 'id' | 'key' | 'name' | 'description'>
  )> }
);

export type TranslatePage_ProjectQueryVariables = {
  id: Scalars['ID'];
};


export type TranslatePage_ProjectQuery = (
  { __typename?: 'Query' }
  & { project: (
    { __typename?: 'Project' }
    & { locales: Array<(
      { __typename?: 'Locale' }
      & Pick<Locale, 'id' | 'name' | 'nativeName' | 'code'>
    )> }
  ) }
);

export type TranslatePage_ScreenQueryVariables = {
  id: Scalars['ID'];
};


export type TranslatePage_ScreenQuery = (
  { __typename?: 'Query' }
  & { screen: (
    { __typename?: 'Screen' }
    & Pick<Screen, 'id' | 'name' | 'description'>
    & { keys: Array<(
      { __typename?: 'Key' }
      & Pick<Key, 'id' | 'name' | 'plural'>
      & { translations: Array<(
        { __typename?: 'Translation' }
        & Pick<Translation, 'id' | 'value'>
        & { locale: (
          { __typename?: 'Locale' }
          & Pick<Locale, 'id'>
        ) }
      )> }
    )> }
  ) }
);

export type TranslatePage_DeleteKeyMutationVariables = {
  id: Scalars['ID'];
};


export type TranslatePage_DeleteKeyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteKey'>
);

export type TranslationFormModal_TranslationQueryVariables = {
  id: Scalars['ID'];
};


export type TranslationFormModal_TranslationQuery = (
  { __typename?: 'Query' }
  & { translation: (
    { __typename?: 'Translation' }
    & Pick<Translation, 'id' | 'value'>
  ) }
);

export type TranslationFormModal_UpsertTranslationMutationVariables = {
  id?: Maybe<Scalars['ID']>;
  value: Scalars['String'];
  keyId: Scalars['ID'];
  localeId: Scalars['ID'];
};


export type TranslationFormModal_UpsertTranslationMutation = (
  { __typename?: 'Mutation' }
  & { upsertTranslation?: Maybe<(
    { __typename?: 'Translation' }
    & Pick<Translation, 'id' | 'value'>
  )> }
);

export type LoginPage_LoginQueryVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginPage_LoginQuery = (
  { __typename?: 'Query' }
  & { login?: Maybe<(
    { __typename?: 'AuthenticationPayload' }
    & Pick<AuthenticationPayload, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'>
    ) }
  )> }
);

export type RedefinePasswordPage_ResetPasswordMutationVariables = {
  password: Scalars['String'];
  token: Scalars['String'];
};


export type RedefinePasswordPage_ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword?: Maybe<(
    { __typename?: 'AuthenticationPayload' }
    & Pick<AuthenticationPayload, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'>
    ) }
  )> }
);

export type RegisterPage_UpsertUserMutationVariables = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};


export type RegisterPage_UpsertUserMutation = (
  { __typename?: 'Mutation' }
  & { upsertUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'createdAt' | 'updatedAt'>
  )> }
);
