import { gql } from "graphql-request";

export const repositoryStatsPulls = gql`
  subscription repositoryStatsPulls {
    repositoryStatsPulls {
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
