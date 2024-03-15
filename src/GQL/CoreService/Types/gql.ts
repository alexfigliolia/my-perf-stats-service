/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation setOrganizationRepositories(\n    $organizationId: Int!\n    $repositories: [InputRepository!]!\n  ) {\n    setOrganizationRepositories(\n      organizationId: $organizationId\n      repositories: $repositories\n    )\n  }\n": types.SetOrganizationRepositoriesDocument,
    "\n  mutation setRepositoryStats(\n    $repositoryId: Int!\n    $organizationId: Int!\n    $lines: Int!\n    $commits: Int!\n    $range: Schedule\n    $mesh: Mesh!\n    $userStats: [UserContributionsInput!]!\n  ) {\n    setRepositoryStats(\n      range: $range\n      repositoryId: $repositoryId\n      organizationId: $organizationId\n      lines: $lines\n      commits: $commits\n      userStats: $userStats\n      mesh: $mesh\n    )\n  }\n": types.SetRepositoryStatsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation setOrganizationRepositories(\n    $organizationId: Int!\n    $repositories: [InputRepository!]!\n  ) {\n    setOrganizationRepositories(\n      organizationId: $organizationId\n      repositories: $repositories\n    )\n  }\n"): (typeof documents)["\n  mutation setOrganizationRepositories(\n    $organizationId: Int!\n    $repositories: [InputRepository!]!\n  ) {\n    setOrganizationRepositories(\n      organizationId: $organizationId\n      repositories: $repositories\n    )\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation setRepositoryStats(\n    $repositoryId: Int!\n    $organizationId: Int!\n    $lines: Int!\n    $commits: Int!\n    $range: Schedule\n    $mesh: Mesh!\n    $userStats: [UserContributionsInput!]!\n  ) {\n    setRepositoryStats(\n      range: $range\n      repositoryId: $repositoryId\n      organizationId: $organizationId\n      lines: $lines\n      commits: $commits\n      userStats: $userStats\n      mesh: $mesh\n    )\n  }\n"): (typeof documents)["\n  mutation setRepositoryStats(\n    $repositoryId: Int!\n    $organizationId: Int!\n    $lines: Int!\n    $commits: Int!\n    $range: Schedule\n    $mesh: Mesh!\n    $userStats: [UserContributionsInput!]!\n  ) {\n    setRepositoryStats(\n      range: $range\n      repositoryId: $repositoryId\n      organizationId: $organizationId\n      lines: $lines\n      commits: $commits\n      userStats: $userStats\n      mesh: $mesh\n    )\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;