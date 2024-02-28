import { gql } from "graphql-request";

export const repositoryStatsPulls = gql`
  subscription repositoryStatsPulls {
    repositoryStatsPulls {
      jobId
      clone_url
      token
      repositoryId
      organizationId
    }
  }
`;
