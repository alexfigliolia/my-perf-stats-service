import { gql } from "graphql-request";

export const setRepositoryStatsJobStatus = gql`
  mutation setRepositoryStatsJobStatus($id: Int!, $status: JobStatus!) {
    setRepositoryStatsJobStatus(id: $id, status: $status)
  }
`;
