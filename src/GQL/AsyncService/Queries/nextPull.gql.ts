import { gql } from "graphql-request";

export const nextRepositoryStatsPullJob = gql`
  query nextRepositoryStatsPullJob {
    nextRepositoryStatsPullJob {
      jobId
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
