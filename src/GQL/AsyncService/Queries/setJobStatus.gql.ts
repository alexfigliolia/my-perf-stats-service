import { gql } from "graphql-request";

export const setJobStatus = gql`
  mutation setJobStatus($id: Int!, $status: JobStatus!) {
    setJobStatus(id: $id, status: $status)
  }
`;
