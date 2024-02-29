import { gql } from "graphql-request";

export const nextRepositoryStatsPullJob = gql`
  query nextRepositoryStatsPullJob {
    nextRepositoryStatsPullJob {
      date
      jobId
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
