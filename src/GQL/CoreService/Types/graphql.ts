/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CurrentUsersTeam = {
  __typename?: 'CurrentUsersTeam';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  projects: Array<TrackedRepositoryType>;
  role: RoleType;
  users: Array<User>;
};

export type GithubUserAuthorizationType = {
  __typename?: 'GithubUserAuthorizationType';
  id: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export type InputRepository = {
  api_url: Scalars['String']['input'];
  clone_url: Scalars['String']['input'];
  created_at: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  html_url: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  platform: Platform;
  platform_id: Scalars['Int']['input'];
  updated_at: Scalars['String']['input'];
};

export type Installation = {
  __typename?: 'Installation';
  id: Scalars['Int']['output'];
  installation_id: Scalars['Int']['output'];
  organizationId?: Maybe<Scalars['Int']['output']>;
  platform: Platform;
  type: InstallationType;
};

export enum InstallationType {
  Individual = 'individual',
  Organization = 'organization'
}

export type Mutation = {
  __typename?: 'Mutation';
  createGithubAccount: Scalars['Boolean']['output'];
  createTeam: CurrentUsersTeam;
  loginWithGithub: User;
  logout: Scalars['Boolean']['output'];
  setOrganizationRepositories: Scalars['Boolean']['output'];
  setRepositoryStats: Scalars['Boolean']['output'];
  trackRepository: Repository;
  verifyAnonymous: Scalars['Boolean']['output'];
  verifySession: Scalars['Boolean']['output'];
};


export type MutationCreateGithubAccountArgs = {
  code: Scalars['String']['input'];
  installation_id: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationCreateTeamArgs = {
  name: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
};


export type MutationLoginWithGithubArgs = {
  code: Scalars['String']['input'];
};


export type MutationSetOrganizationRepositoriesArgs = {
  organizationId: Scalars['Int']['input'];
  repositories: Array<InputRepository>;
};


export type MutationSetRepositoryStatsArgs = {
  commits: Scalars['Int']['input'];
  lines: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  range?: InputMaybe<Schedule>;
  repositoryId: Scalars['Int']['input'];
  userStats: Array<UserContributionsInput>;
};


export type MutationTrackRepositoryArgs = {
  id: Scalars['Int']['input'];
};

export type OrgAffiliationType = {
  __typename?: 'OrgAffiliationType';
  id: Scalars['Int']['output'];
  installations: Array<Installation>;
  name: Scalars['String']['output'];
  roles: Array<RoleType>;
};

export type OverallStatsPerUser = {
  __typename?: 'OverallStatsPerUser';
  commits: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  lines: Scalars['Int']['output'];
  linesPerMonth: Array<Scalars['Int']['output']>;
  name: Scalars['String']['output'];
};

export enum Platform {
  Bitbucket = 'bitbucket',
  Github = 'github'
}

export type Query = {
  __typename?: 'Query';
  availableRepositories: Array<Repository>;
  installationSetup: Installation;
  myTeams: Array<CurrentUsersTeam>;
  overallStatsPerUser: TeamStats;
  standouts: Array<Standout>;
  teams: Array<Team>;
  totalRepositories: Scalars['Int']['output'];
  totalTeams: Scalars['Int']['output'];
  trackedRepositories: Array<Repository>;
  userAndAffiliations: UserAndAffiliations;
};


export type QueryAvailableRepositoriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  organizationId: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<RepositorySortKeys>;
};


export type QueryInstallationSetupArgs = {
  installation_id: Scalars['Int']['input'];
  platform: Platform;
};


export type QueryMyTeamsArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryOverallStatsPerUserArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryStandoutsArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryTeamsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  omitCurrentUser?: InputMaybe<Scalars['Boolean']['input']>;
  organizationId: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTotalRepositoriesArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryTotalTeamsArgs = {
  organizationId: Scalars['Int']['input'];
};


export type QueryTrackedRepositoriesArgs = {
  organizationId: Scalars['Int']['input'];
};

export type Repository = {
  __typename?: 'Repository';
  api_url: Scalars['String']['output'];
  clone_url: Scalars['String']['output'];
  created_at: Scalars['String']['output'];
  description: Scalars['String']['output'];
  html_url: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  language: Scalars['String']['output'];
  name: Scalars['String']['output'];
  platform: Platform;
  platform_id: Scalars['Int']['output'];
  updated_at: Scalars['String']['output'];
};

export enum RepositorySortKeys {
  CreatedAt = 'created_at',
  Language = 'language',
  Name = 'name',
  UpdatedAt = 'updated_at'
}

export type RoleType = {
  __typename?: 'RoleType';
  role: UserRole;
};

export enum Schedule {
  Daily = 'daily',
  Monthly = 'monthly',
  Once = 'once',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export type Standout = {
  __typename?: 'Standout';
  id: Scalars['Int']['output'];
  increase: Scalars['Int']['output'];
  lines: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  availableRepositoriesStream: Array<Repository>;
  installationSetupStream: Installation;
};


export type SubscriptionAvailableRepositoriesStreamArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  organizationId: Scalars['Int']['input'];
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<RepositorySortKeys>;
};


export type SubscriptionInstallationSetupStreamArgs = {
  installation_id: Scalars['Int']['input'];
  platform: Platform;
};

export type Team = {
  __typename?: 'Team';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organizationId: Scalars['Int']['output'];
  projects: Array<TrackedRepositoryType>;
  users: Array<User>;
};

export type TeamStats = {
  __typename?: 'TeamStats';
  totalCommits: Scalars['Int']['output'];
  totalLines: Scalars['Int']['output'];
  users: Array<OverallStatsPerUser>;
};

export type TrackedRepositoryType = {
  __typename?: 'TrackedRepositoryType';
  id: Scalars['Int']['output'];
  repository: Repository;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type UserAndAffiliations = {
  __typename?: 'UserAndAffiliations';
  github?: Maybe<GithubUserAuthorizationType>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  organizations: Array<OrgAffiliationType>;
};

export type UserContributionsInput = {
  commits: Scalars['Int']['input'];
  email: Scalars['String']['input'];
  lines: Scalars['Int']['input'];
};

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Viewer = 'viewer'
}

export type SetOrganizationRepositoriesMutationVariables = Exact<{
  organizationId: Scalars['Int']['input'];
  repositories: Array<InputRepository> | InputRepository;
}>;


export type SetOrganizationRepositoriesMutation = { __typename?: 'Mutation', setOrganizationRepositories: boolean };

export type SetRepositoryStatsMutationVariables = Exact<{
  repositoryId: Scalars['Int']['input'];
  organizationId: Scalars['Int']['input'];
  lines: Scalars['Int']['input'];
  commits: Scalars['Int']['input'];
  range?: InputMaybe<Schedule>;
  userStats: Array<UserContributionsInput> | UserContributionsInput;
}>;


export type SetRepositoryStatsMutation = { __typename?: 'Mutation', setRepositoryStats: boolean };


export const SetOrganizationRepositoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setOrganizationRepositories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repositories"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"InputRepository"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setOrganizationRepositories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"repositories"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repositories"}}}]}]}}]} as unknown as DocumentNode<SetOrganizationRepositoriesMutation, SetOrganizationRepositoriesMutationVariables>;
export const SetRepositoryStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setRepositoryStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"repositoryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lines"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"commits"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"range"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Schedule"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userStats"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserContributionsInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRepositoryStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"range"},"value":{"kind":"Variable","name":{"kind":"Name","value":"range"}}},{"kind":"Argument","name":{"kind":"Name","value":"repositoryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"repositoryId"}}},{"kind":"Argument","name":{"kind":"Name","value":"organizationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"organizationId"}}},{"kind":"Argument","name":{"kind":"Name","value":"lines"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lines"}}},{"kind":"Argument","name":{"kind":"Name","value":"commits"},"value":{"kind":"Variable","name":{"kind":"Name","value":"commits"}}},{"kind":"Argument","name":{"kind":"Name","value":"userStats"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userStats"}}}]}]}}]} as unknown as DocumentNode<SetRepositoryStatsMutation, SetRepositoryStatsMutationVariables>;