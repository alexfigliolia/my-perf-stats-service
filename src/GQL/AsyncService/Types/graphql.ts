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

export enum JobStatus {
  Complete = 'complete',
  Failed = 'failed',
  Inprogress = 'inprogress',
  Pending = 'pending'
}

export type Mutation = {
  __typename?: 'Mutation';
  deleteRepositoryStatsJobs: Scalars['Boolean']['output'];
  registerRepositoryPull: Scalars['Int']['output'];
  registerRepositoryStatsPull: Scalars['Int']['output'];
  setJobStatus: Scalars['Boolean']['output'];
  setRepositoryStatsJobStatus: Scalars['Boolean']['output'];
  subscribeToRepositoryStats: Scalars['Boolean']['output'];
};


export type MutationDeleteRepositoryStatsJobsArgs = {
  repositoryId: Scalars['Int']['input'];
};


export type MutationRegisterRepositoryPullArgs = {
  api_url: Scalars['String']['input'];
  organizationId: Scalars['Int']['input'];
  platform: Platform;
  requestMethod: RequestMethod;
  token: Scalars['String']['input'];
};


export type MutationRegisterRepositoryStatsPullArgs = {
  clone_url: Scalars['String']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['Int']['input'];
  repositoryId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};


export type MutationSetJobStatusArgs = {
  id: Scalars['Int']['input'];
  status: JobStatus;
};


export type MutationSetRepositoryStatsJobStatusArgs = {
  id: Scalars['Int']['input'];
  status: JobStatus;
};


export type MutationSubscribeToRepositoryStatsArgs = {
  clone_url: Scalars['String']['input'];
  date?: InputMaybe<Scalars['String']['input']>;
  organizationId: Scalars['Int']['input'];
  repositoryId: Scalars['Int']['input'];
  token: Scalars['String']['input'];
};

export enum Platform {
  Bitbucket = 'bitbucket',
  Github = 'github'
}

export type Query = {
  __typename?: 'Query';
  checkRepositoryPullStatus: JobStatus;
  nextRepositoryPullJob: RepositoryPullJob;
  nextRepositoryStatsPullJob: RepositoryStatsPullJob;
};


export type QueryCheckRepositoryPullStatusArgs = {
  organizationId: Scalars['Int']['input'];
};

export type RepositoryPullJob = {
  __typename?: 'RepositoryPullJob';
  api_url: Scalars['String']['output'];
  currentPage: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  jobId: Scalars['Int']['output'];
  organizationId: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  platform: Platform;
  requestMethod: RequestMethod;
  token: Scalars['String']['output'];
};

export type RepositoryStatsPullJob = {
  __typename?: 'RepositoryStatsPullJob';
  clone_url: Scalars['String']['output'];
  date?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  jobId: Scalars['Int']['output'];
  organizationId: Scalars['Int']['output'];
  range?: Maybe<Schedule>;
  repositoryId: Scalars['Int']['output'];
  token: Scalars['String']['output'];
};

export enum RequestMethod {
  Get = 'GET',
  Post = 'POST'
}

export enum Schedule {
  Daily = 'daily',
  Monthly = 'monthly',
  Once = 'once',
  Weekly = 'weekly',
  Yearly = 'yearly'
}

export type Subscription = {
  __typename?: 'Subscription';
  repositoryPulls: RepositoryPullJob;
  repositoryStatsPulls: RepositoryStatsPullJob;
};

export type NextRepositoryStatsPullJobQueryVariables = Exact<{ [key: string]: never; }>;


export type NextRepositoryStatsPullJobQuery = { __typename?: 'Query', nextRepositoryStatsPullJob: { __typename?: 'RepositoryStatsPullJob', date?: string | null, jobId: number, range?: Schedule | null, clone_url: string, token: string, repositoryId: number, organizationId: number } };

export type RepositoryStatsPullsSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RepositoryStatsPullsSubscription = { __typename?: 'Subscription', repositoryStatsPulls: { __typename?: 'RepositoryStatsPullJob', date?: string | null, jobId: number, range?: Schedule | null, clone_url: string, token: string, repositoryId: number, organizationId: number } };

export type SetRepositoryStatsJobStatusMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  status: JobStatus;
}>;


export type SetRepositoryStatsJobStatusMutation = { __typename?: 'Mutation', setRepositoryStatsJobStatus: boolean };


export const NextRepositoryStatsPullJobDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nextRepositoryStatsPullJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nextRepositoryStatsPullJob"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"range"}},{"kind":"Field","name":{"kind":"Name","value":"clone_url"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<NextRepositoryStatsPullJobQuery, NextRepositoryStatsPullJobQueryVariables>;
export const RepositoryStatsPullsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"repositoryStatsPulls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"repositoryStatsPulls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"jobId"}},{"kind":"Field","name":{"kind":"Name","value":"range"}},{"kind":"Field","name":{"kind":"Name","value":"clone_url"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"repositoryId"}},{"kind":"Field","name":{"kind":"Name","value":"organizationId"}}]}}]}}]} as unknown as DocumentNode<RepositoryStatsPullsSubscription, RepositoryStatsPullsSubscriptionVariables>;
export const SetRepositoryStatsJobStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"setRepositoryStatsJobStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"status"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JobStatus"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"setRepositoryStatsJobStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"status"},"value":{"kind":"Variable","name":{"kind":"Name","value":"status"}}}]}]}}]} as unknown as DocumentNode<SetRepositoryStatsJobStatusMutation, SetRepositoryStatsJobStatusMutationVariables>;