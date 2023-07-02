import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers($paginationInput: PaginationInput, $filterInput: UsersFilterInput) {
    getUsers(paginationInput: $paginationInput, filterInput: $filterInput) {
      users {
        id
        username
        status
        email
        loginType
        password
        createDate
        organizations {
          id
          title
        }
      }
      totalCount
    }
  }
`;

export const GET_ORGANIZATIONS_QUERY = gql`
  query GetOrganizations(
    $paginationInput: PaginationInput
    $filterInput: OrganizationsFilterInput
  ) {
    getOrganizations(paginationInput: $paginationInput, filterInput: $filterInput) {
      organizations {
        id
        title
        description
        status
        url
        image
        createDate
        editDate
        users {
          id
        }
        ents {
          title
        }
        subOrganizations {
          id
          title
        }
      }
      totalCount
    }
  }
`;
