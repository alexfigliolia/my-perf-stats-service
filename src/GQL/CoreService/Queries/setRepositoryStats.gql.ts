import { gql } from "graphql-request";

export const setRepositoryStats = gql`
  mutation setRepositoryStats(
    $repositoryId: Int!
    $organizationId: Int!
    $lines: Int!
    $commits: Int!
    $range: Schedule
    $userStats: [UserContributionsInput!]!
  ) {
    setRepositoryStats(
      range: $range
      repositoryId: $repositoryId
      organizationId: $organizationId
      lines: $lines
      commits: $commits
      userStats: $userStats
    )
  }
`;
