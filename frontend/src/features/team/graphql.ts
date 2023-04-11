import { gql } from "@apollo/client";

export const GET_ALL_USERS_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`;

export const REMOVE_USER_BY_ID_QUERY = gql`
  mutation RemoveUser($id: Float!) {
    removeUser(id: $id)
  }
`;
