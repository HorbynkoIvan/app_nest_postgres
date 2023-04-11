import { useQuery } from "@apollo/client";
import { UserType } from "common/interfaces";
import { GET_ALL_USERS_QUERY } from "common/graphql";

type Return = {
  users: UserType[];
  loading: boolean;
};

export const useAllUsersAPI = (): Return => {
  const { data, loading } = useQuery(GET_ALL_USERS_QUERY);

  return {
    users: data ? data.getAllUsers : [],
    loading,
  };
};
