import { gql } from "graphql-request";

export const setRepositoryStats = gql`
  mutation setRepositoryStats(
    $repositoryId: Int!
    $organizationId: Int!
    $lines: Int!
    $commits: Int!
    $range: Schedule
    $mesh: Mesh!
    $pullRequests: [PullRequestEntry!]!
    $userStats: [UserContributionsInput!]!
  ) {
    setRepositoryStats(
      range: $range
      repositoryId: $repositoryId
      organizationId: $organizationId
      lines: $lines
      commits: $commits
      userStats: $userStats
      pullRequests: $pullRequests
      mesh: $mesh
    )
  }
`;
