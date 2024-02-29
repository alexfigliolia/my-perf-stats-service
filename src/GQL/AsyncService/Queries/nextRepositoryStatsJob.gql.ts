import { gql } from "graphql-request";

export const nextRepositoryStatsPullJob = gql`
  query nextRepositoryStatsPullJob {
    nextRepositoryStatsPullJob {
      date
      jobId
      range
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
