import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../graphql/resolvers/context';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
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
  forgotPassword?: Maybe<Scalars['Boolean']>;
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


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  String: ResolverTypeWrapper<Scalars['String']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  JSON: ResolverTypeWrapper<Scalars['JSON']>,
  Query: ResolverTypeWrapper<{}>,
  Mutation: ResolverTypeWrapper<{}>,
  ProjectsWhereInput: ProjectsWhereInput,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  ProjectWhereInput: ProjectWhereInput,
  KeyWhereInput: KeyWhereInput,
  DeleteKeyWhereInput: DeleteKeyWhereInput,
  TranslationWhereInput: TranslationWhereInput,
  ScreensWhereInput: ScreensWhereInput,
  ScreenWhereInput: ScreenWhereInput,
  LocaleWhereInput: LocaleWhereInput,
  UpsertProjectDataInput: UpsertProjectDataInput,
  UpsertProjectWhereInput: UpsertProjectWhereInput,
  UpsertTranslationDataInput: UpsertTranslationDataInput,
  UpsertTranslationWhereInput: UpsertTranslationWhereInput,
  UpsertKeyDataInput: UpsertKeyDataInput,
  UpsertKeyWhereInput: UpsertKeyWhereInput,
  UpsertLocaleDataInput: UpsertLocaleDataInput,
  UpsertLocaleWhereInput: UpsertLocaleWhereInput,
  UpsertScreenDataInput: UpsertScreenDataInput,
  UpsertScreenWhereInput: UpsertScreenWhereInput,
  UpsertUserDataInput: UpsertUserDataInput,
  UpsertUserWhereInput: UpsertUserWhereInput,
  AuthenticationPayload: ResolverTypeWrapper<AuthenticationPayload>,
  Key: ResolverTypeWrapper<Key>,
  Locale: ResolverTypeWrapper<Locale>,
  Project: ResolverTypeWrapper<Project>,
  Screen: ResolverTypeWrapper<Screen>,
  Translation: ResolverTypeWrapper<Translation>,
  User: ResolverTypeWrapper<User>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  String: Scalars['String'],
  Boolean: Scalars['Boolean'],
  DateTime: Scalars['DateTime'],
  JSON: Scalars['JSON'],
  Query: {},
  Mutation: {},
  ProjectsWhereInput: ProjectsWhereInput,
  ID: Scalars['ID'],
  ProjectWhereInput: ProjectWhereInput,
  KeyWhereInput: KeyWhereInput,
  DeleteKeyWhereInput: DeleteKeyWhereInput,
  TranslationWhereInput: TranslationWhereInput,
  ScreensWhereInput: ScreensWhereInput,
  ScreenWhereInput: ScreenWhereInput,
  LocaleWhereInput: LocaleWhereInput,
  UpsertProjectDataInput: UpsertProjectDataInput,
  UpsertProjectWhereInput: UpsertProjectWhereInput,
  UpsertTranslationDataInput: UpsertTranslationDataInput,
  UpsertTranslationWhereInput: UpsertTranslationWhereInput,
  UpsertKeyDataInput: UpsertKeyDataInput,
  UpsertKeyWhereInput: UpsertKeyWhereInput,
  UpsertLocaleDataInput: UpsertLocaleDataInput,
  UpsertLocaleWhereInput: UpsertLocaleWhereInput,
  UpsertScreenDataInput: UpsertScreenDataInput,
  UpsertScreenWhereInput: UpsertScreenWhereInput,
  UpsertUserDataInput: UpsertUserDataInput,
  UpsertUserWhereInput: UpsertUserWhereInput,
  AuthenticationPayload: AuthenticationPayload,
  Key: Key,
  Locale: Locale,
  Project: Project,
  Screen: Screen,
  Translation: Translation,
  User: User,
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON'
}

export type QueryResolvers<ContextType = Context, ParentType = ResolversParentTypes['Query']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['AuthenticationPayload']>, ParentType, ContextType, QueryLoginArgs>,
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, QueryProjectsArgs>,
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType, QueryProjectArgs>,
  screens?: Resolver<Array<ResolversTypes['Screen']>, ParentType, ContextType, QueryScreensArgs>,
  screen?: Resolver<ResolversTypes['Screen'], ParentType, ContextType, QueryScreenArgs>,
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType, QueryLocaleArgs>,
  key?: Resolver<ResolversTypes['Key'], ParentType, ContextType, QueryKeyArgs>,
  translation?: Resolver<ResolversTypes['Translation'], ParentType, ContextType, QueryTranslationArgs>,
  i18next?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, QueryI18nextArgs>,
}>;

export type MutationResolvers<ContextType = Context, ParentType = ResolversParentTypes['Mutation']> = ResolversObject<{
  upsertTranslation?: Resolver<Maybe<ResolversTypes['Translation']>, ParentType, ContextType, MutationUpsertTranslationArgs>,
  upsertKey?: Resolver<Maybe<ResolversTypes['Key']>, ParentType, ContextType, MutationUpsertKeyArgs>,
  deleteKey?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationDeleteKeyArgs>,
  upsertLocale?: Resolver<Maybe<ResolversTypes['Locale']>, ParentType, ContextType, MutationUpsertLocaleArgs>,
  upsertUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUpsertUserArgs>,
  upsertProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, MutationUpsertProjectArgs>,
  upsertScreen?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, MutationUpsertScreenArgs>,
  resetPassword?: Resolver<Maybe<ResolversTypes['AuthenticationPayload']>, ParentType, ContextType, MutationResetPasswordArgs>,
  forgotPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationForgotPasswordArgs>,
}>;

export type AuthenticationPayloadResolvers<ContextType = Context, ParentType = ResolversParentTypes['AuthenticationPayload']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
}>;

export type KeyResolvers<ContextType = Context, ParentType = ResolversParentTypes['Key']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  screen?: Resolver<ResolversTypes['Screen'], ParentType, ContextType>,
  translations?: Resolver<Array<ResolversTypes['Translation']>, ParentType, ContextType>,
  plural?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type LocaleResolvers<ContextType = Context, ParentType = ResolversParentTypes['Locale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  nativeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type ProjectResolvers<ContextType = Context, ParentType = ResolversParentTypes['Project']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  screens?: Resolver<Array<ResolversTypes['Screen']>, ParentType, ContextType>,
  locales?: Resolver<Array<ResolversTypes['Locale']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type ScreenResolvers<ContextType = Context, ParentType = ResolversParentTypes['Screen']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>,
  keys?: Resolver<Array<ResolversTypes['Key']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type TranslationResolvers<ContextType = Context, ParentType = ResolversParentTypes['Translation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>,
  key?: Resolver<ResolversTypes['Key'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type UserResolvers<ContextType = Context, ParentType = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType,
  JSON?: GraphQLScalarType,
  Query?: QueryResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  AuthenticationPayload?: AuthenticationPayloadResolvers<ContextType>,
  Key?: KeyResolvers<ContextType>,
  Locale?: LocaleResolvers<ContextType>,
  Project?: ProjectResolvers<ContextType>,
  Screen?: ScreenResolvers<ContextType>,
  Translation?: TranslationResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;

