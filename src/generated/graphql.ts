import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Context } from '../graphql/resolvers/context';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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
  externalTranslation: PapagoTranslationResponse;
  i18next?: Maybe<Scalars['JSON']>;
  test: Scalars['String'];
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


export type QueryExternalTranslationArgs = {
  data: ExternalTranslationWhereInput;
};


export type QueryI18nextArgs = {
  key: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  deleteProject?: Maybe<Project>;
  deleteKey?: Maybe<Scalars['Boolean']>;
  deleteScreen?: Maybe<Scalars['Boolean']>;
  upsertTranslation?: Maybe<Translation>;
  upsertKey?: Maybe<Key>;
  upsertLocale?: Maybe<Locale>;
  upsertUser?: Maybe<User>;
  upsertProject?: Maybe<Project>;
  upsertScreen?: Maybe<Project>;
  resetPassword?: Maybe<AuthenticationPayload>;
  forgotPassword?: Maybe<Scalars['Boolean']>;
};


export type MutationDeleteProjectArgs = {
  data: DeleteProjectDataInput;
};


export type MutationDeleteKeyArgs = {
  where: DeleteKeyWhereInput;
};


export type MutationDeleteScreenArgs = {
  data: DeleteScreenDataInput;
};


export type MutationUpsertTranslationArgs = {
  data: UpsertTranslationDataInput;
  where?: Maybe<UpsertTranslationWhereInput>;
};


export type MutationUpsertKeyArgs = {
  data: UpsertKeyDataInput;
  where?: Maybe<UpsertKeyWhereInput>;
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

export type ExternalTranslationWhereInput = {
  source: Scalars['String'];
  target: Scalars['String'];
  text: Scalars['String'];
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

export type DeleteProjectDataInput = {
  id: Scalars['ID'];
};

export type DeleteScreenDataInput = {
  id: Scalars['ID'];
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

export type PapagoTranslationResult = {
  __typename?: 'PapagoTranslationResult';
  srcLangType?: Maybe<Scalars['String']>;
  tarLangType?: Maybe<Scalars['String']>;
  translatedText?: Maybe<Scalars['String']>;
};

export type PapagoTranslationResponseMessage = {
  __typename?: 'PapagoTranslationResponseMessage';
  type?: Maybe<Scalars['String']>;
  service?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
  result: PapagoTranslationResult;
};

export type PapagoTranslationResponse = {
  __typename?: 'PapagoTranslationResponse';
  message: PapagoTranslationResponseMessage;
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


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ProjectsWhereInput: ProjectsWhereInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ProjectWhereInput: ProjectWhereInput;
  KeyWhereInput: KeyWhereInput;
  DeleteKeyWhereInput: DeleteKeyWhereInput;
  TranslationWhereInput: TranslationWhereInput;
  ExternalTranslationWhereInput: ExternalTranslationWhereInput;
  ScreensWhereInput: ScreensWhereInput;
  ScreenWhereInput: ScreenWhereInput;
  LocaleWhereInput: LocaleWhereInput;
  UpsertProjectDataInput: UpsertProjectDataInput;
  DeleteProjectDataInput: DeleteProjectDataInput;
  DeleteScreenDataInput: DeleteScreenDataInput;
  UpsertProjectWhereInput: UpsertProjectWhereInput;
  UpsertTranslationDataInput: UpsertTranslationDataInput;
  UpsertTranslationWhereInput: UpsertTranslationWhereInput;
  UpsertKeyDataInput: UpsertKeyDataInput;
  UpsertKeyWhereInput: UpsertKeyWhereInput;
  UpsertLocaleDataInput: UpsertLocaleDataInput;
  UpsertLocaleWhereInput: UpsertLocaleWhereInput;
  UpsertScreenDataInput: UpsertScreenDataInput;
  UpsertScreenWhereInput: UpsertScreenWhereInput;
  UpsertUserDataInput: UpsertUserDataInput;
  UpsertUserWhereInput: UpsertUserWhereInput;
  AuthenticationPayload: ResolverTypeWrapper<AuthenticationPayload>;
  Key: ResolverTypeWrapper<Key>;
  Locale: ResolverTypeWrapper<Locale>;
  Project: ResolverTypeWrapper<Project>;
  Screen: ResolverTypeWrapper<Screen>;
  Translation: ResolverTypeWrapper<Translation>;
  PapagoTranslationResult: ResolverTypeWrapper<PapagoTranslationResult>;
  PapagoTranslationResponseMessage: ResolverTypeWrapper<PapagoTranslationResponseMessage>;
  PapagoTranslationResponse: ResolverTypeWrapper<PapagoTranslationResponse>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  DateTime: Scalars['DateTime'];
  JSON: Scalars['JSON'];
  Query: {};
  String: Scalars['String'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  ProjectsWhereInput: ProjectsWhereInput;
  ID: Scalars['ID'];
  ProjectWhereInput: ProjectWhereInput;
  KeyWhereInput: KeyWhereInput;
  DeleteKeyWhereInput: DeleteKeyWhereInput;
  TranslationWhereInput: TranslationWhereInput;
  ExternalTranslationWhereInput: ExternalTranslationWhereInput;
  ScreensWhereInput: ScreensWhereInput;
  ScreenWhereInput: ScreenWhereInput;
  LocaleWhereInput: LocaleWhereInput;
  UpsertProjectDataInput: UpsertProjectDataInput;
  DeleteProjectDataInput: DeleteProjectDataInput;
  DeleteScreenDataInput: DeleteScreenDataInput;
  UpsertProjectWhereInput: UpsertProjectWhereInput;
  UpsertTranslationDataInput: UpsertTranslationDataInput;
  UpsertTranslationWhereInput: UpsertTranslationWhereInput;
  UpsertKeyDataInput: UpsertKeyDataInput;
  UpsertKeyWhereInput: UpsertKeyWhereInput;
  UpsertLocaleDataInput: UpsertLocaleDataInput;
  UpsertLocaleWhereInput: UpsertLocaleWhereInput;
  UpsertScreenDataInput: UpsertScreenDataInput;
  UpsertScreenWhereInput: UpsertScreenWhereInput;
  UpsertUserDataInput: UpsertUserDataInput;
  UpsertUserWhereInput: UpsertUserWhereInput;
  AuthenticationPayload: AuthenticationPayload;
  Key: Key;
  Locale: Locale;
  Project: Project;
  Screen: Screen;
  Translation: Translation;
  PapagoTranslationResult: PapagoTranslationResult;
  PapagoTranslationResponseMessage: PapagoTranslationResponseMessage;
  PapagoTranslationResponse: PapagoTranslationResponse;
  User: User;
}>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  login?: Resolver<Maybe<ResolversTypes['AuthenticationPayload']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<QueryProjectsArgs, never>>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType, RequireFields<QueryProjectArgs, 'where'>>;
  screens?: Resolver<Array<ResolversTypes['Screen']>, ParentType, ContextType, RequireFields<QueryScreensArgs, never>>;
  screen?: Resolver<ResolversTypes['Screen'], ParentType, ContextType, RequireFields<QueryScreenArgs, 'where'>>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType, RequireFields<QueryLocaleArgs, 'where'>>;
  key?: Resolver<ResolversTypes['Key'], ParentType, ContextType, RequireFields<QueryKeyArgs, 'where'>>;
  translation?: Resolver<ResolversTypes['Translation'], ParentType, ContextType, RequireFields<QueryTranslationArgs, 'where'>>;
  externalTranslation?: Resolver<ResolversTypes['PapagoTranslationResponse'], ParentType, ContextType, RequireFields<QueryExternalTranslationArgs, 'data'>>;
  i18next?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType, RequireFields<QueryI18nextArgs, 'key'>>;
  test?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  deleteProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationDeleteProjectArgs, 'data'>>;
  deleteKey?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteKeyArgs, 'where'>>;
  deleteScreen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteScreenArgs, 'data'>>;
  upsertTranslation?: Resolver<Maybe<ResolversTypes['Translation']>, ParentType, ContextType, RequireFields<MutationUpsertTranslationArgs, 'data'>>;
  upsertKey?: Resolver<Maybe<ResolversTypes['Key']>, ParentType, ContextType, RequireFields<MutationUpsertKeyArgs, 'data'>>;
  upsertLocale?: Resolver<Maybe<ResolversTypes['Locale']>, ParentType, ContextType, RequireFields<MutationUpsertLocaleArgs, 'data'>>;
  upsertUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpsertUserArgs, 'data'>>;
  upsertProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationUpsertProjectArgs, 'data'>>;
  upsertScreen?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, RequireFields<MutationUpsertScreenArgs, 'data'>>;
  resetPassword?: Resolver<Maybe<ResolversTypes['AuthenticationPayload']>, ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'password' | 'token'>>;
  forgotPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
}>;

export type AuthenticationPayloadResolvers<ContextType = Context, ParentType extends ResolversParentTypes['AuthenticationPayload'] = ResolversParentTypes['AuthenticationPayload']> = ResolversObject<{
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type KeyResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Key'] = ResolversParentTypes['Key']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  screen?: Resolver<ResolversTypes['Screen'], ParentType, ContextType>;
  translations?: Resolver<Array<ResolversTypes['Translation']>, ParentType, ContextType>;
  plural?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type LocaleResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Locale'] = ResolversParentTypes['Locale']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nativeName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProjectResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  screens?: Resolver<Array<ResolversTypes['Screen']>, ParentType, ContextType>;
  locales?: Resolver<Array<ResolversTypes['Locale']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ScreenResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Screen'] = ResolversParentTypes['Screen']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  project?: Resolver<ResolversTypes['Project'], ParentType, ContextType>;
  keys?: Resolver<Array<ResolversTypes['Key']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type TranslationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Translation'] = ResolversParentTypes['Translation']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  locale?: Resolver<ResolversTypes['Locale'], ParentType, ContextType>;
  key?: Resolver<ResolversTypes['Key'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PapagoTranslationResultResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PapagoTranslationResult'] = ResolversParentTypes['PapagoTranslationResult']> = ResolversObject<{
  srcLangType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tarLangType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  translatedText?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PapagoTranslationResponseMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PapagoTranslationResponseMessage'] = ResolversParentTypes['PapagoTranslationResponseMessage']> = ResolversObject<{
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  service?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  version?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  result?: Resolver<ResolversTypes['PapagoTranslationResult'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type PapagoTranslationResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PapagoTranslationResponse'] = ResolversParentTypes['PapagoTranslationResponse']> = ResolversObject<{
  message?: Resolver<ResolversTypes['PapagoTranslationResponseMessage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  AuthenticationPayload?: AuthenticationPayloadResolvers<ContextType>;
  Key?: KeyResolvers<ContextType>;
  Locale?: LocaleResolvers<ContextType>;
  Project?: ProjectResolvers<ContextType>;
  Screen?: ScreenResolvers<ContextType>;
  Translation?: TranslationResolvers<ContextType>;
  PapagoTranslationResult?: PapagoTranslationResultResolvers<ContextType>;
  PapagoTranslationResponseMessage?: PapagoTranslationResponseMessageResolvers<ContextType>;
  PapagoTranslationResponse?: PapagoTranslationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
