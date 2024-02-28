import { gql } from "graphql-request";

export const repositoryStatsPulls = gql`
  subscription repositoryStatsPulls {
    repositoryStatsPulls {
      date
      jobId
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
