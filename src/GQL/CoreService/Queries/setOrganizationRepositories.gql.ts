import { gql } from "graphql-request";

export const setOrganizationRepositories = gql`
  mutation setOrganizationRepositories(
    $organizationId: Int!
    $repositories: [InputRepository!]!
  ) {
    setOrganizationRepositories(
      organizationId: $organizationId
      repositories: $repositories
    )
  }
`;
