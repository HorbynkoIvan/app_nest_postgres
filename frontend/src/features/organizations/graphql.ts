import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS_QUERY = gql`
  query GetOrganizations {
    getOrganizations {
      id
      icon
      name
      type
      admins {
        id
        username
        status
        role
        email
        dateCreate
      }
      users {
        id
        username
        status
        role
        email
        dateCreate
      }
    }
  }
`;
