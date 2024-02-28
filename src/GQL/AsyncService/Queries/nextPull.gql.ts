import { gql } from "graphql-request";

export const nextRepositoryStatsPullJob = gql`
  query nextRepositoryStatsPullJob {
    nextRepositoryStatsPullJob {
      jobId
      date
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
