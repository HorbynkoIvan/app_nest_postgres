import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers {
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`;

export const GET_USER_QUERY = gql`
  query GetUser($id: Float!) {
    getUser(id: $id) {
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

export const CREATE_USER_MUTATION = gql`
  mutation createUser($user: CreateUserInput!) {
    createUser(createUser: $user) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(updateUser: $user) {
      createdAt
      email
      id
      name
      updatedAt
    }
  }
`;
