import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query GetUsers {
    getUsers(usersInput: {}) {
      createdAt
      email
      id
      userName
      updatedAt
      profile {
        id
        age
        role
        firstName
        lastName
      }
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
      userName
      email
      createdAt
      updatedAt
      profile {
        id
        age
        role
        lastName
        firstName
      }
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
