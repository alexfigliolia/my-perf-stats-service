import { gql } from "graphql-request";

export const setRepositoryStats = gql`
  mutation setRepositoryStats(
    $repositoryId: Int!
    $organizationId: Int!
    $lines: Int!
    $commits: Int!
    $date: String
    $userStats: [UserContributionsInput!]!
  ) {
    setRepositoryStats(
      date: $date
      repositoryId: $repositoryId
      organizationId: $organizationId
      lines: $lines
      commits: $commits
      userStats: $userStats
    )
  }
`;
