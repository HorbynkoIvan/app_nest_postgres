import { gql } from "@apollo/client";

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
