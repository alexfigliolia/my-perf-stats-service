import { gql } from "graphql-request";

export const setRepositoryStats = gql`
  mutation setRepositoryStats(
    $repositoryId: Int!
    $organizationId: Int!
    $totalLines: Int!
    $totalCommits: Int!
    $userStats: [UserContributionsInput!]!
  ) {
    setRepositoryStats(
      repositoryId: $repositoryId
      organizationId: $organizationId
      totalLines: $totalLines
      totalCommits: $totalCommits
      userStats: $userStats
    )
  }
`;
