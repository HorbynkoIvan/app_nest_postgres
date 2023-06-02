import { gql } from "@apollo/client";

export const GET_ORGANIZATIONS_QUERY = gql`
  query GetOrganizations {
    getOrganizations {
      id
      title
      description
      status
      image
      parent {
        id
        title
        status
        image
        createDate
      }
      subOrganizations {
        id
        title
        status
        image
        createDate
      }
      users {
        id
        username
        status
        role
        email
        dateCreate
      }
      createDate
    }
  }
`;

export const GET_ORGANIZATION_QUERY = gql`
  query GetOrganization($id: Int!) {
    getOrganization(id: $id) {
      id
      title
      description
      status
      image
      parent {
        id
        title
        status
        image
        createDate
      }
      subOrganizations {
        id
        title
        status
        image
        createDate
      }
      users {
        id
        username
        status
        role
        email
        dateCreate
      }
      createDate
    }
  }
`;
