import { useQuery } from "@apollo/client";
import { UserType } from "common/interfaces";
import { GET_USERS_QUERY } from "common/graphql";

type Return = {
  users: UserType[];
  loading: boolean;
};

export const useUsersAPI = (roles: string[]): Return => {
  const { data, loading } = useQuery(GET_USERS_QUERY, {
    variables: { usersInput: { roles } },
  });

  return {
    users: data ? data.getUsers : [],
    loading,
  };
};
