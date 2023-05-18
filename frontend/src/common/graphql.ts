import { gql } from "@apollo/client";

export const GET_USERS_QUERY = gql`
  query getUsers($usersInput: GetUsersInput!) {
    getUsers(usersInput: $usersInput) {
      id
      email
      userName
      createdAt
      updatedAt
      profile {
        id
        age
        role
        city
        lastName
        firstName
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
      userName
      updatedAt
      profile {
        id
        age
        role
        city
        firstName
        lastName
      }
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
        city
        lastName
        firstName
      }
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($user: UpdateUserInput!) {
    updateUser(updateUser: $user) {
      id
      userName
      email
      createdAt
      updatedAt
      profile {
        id
        age
        role
        city
        lastName
        firstName
      }
    }
  }
`;

export const GET_AGENCIES_QUERY = gql`
  query getAgencies($filterInput: GetAgenciesInput!, $paginationInput: PaginationInput!) {
    getAgencies(filterInput: $filterInput, paginationInput: $paginationInput) {
      agencies {
        createDate
        description
        editDate
        id
        title
        type
      }
      totalCount
    }
  }
`;
