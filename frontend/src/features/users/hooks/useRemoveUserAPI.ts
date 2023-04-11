import { useMutation } from "@apollo/client";
import { GET_ALL_USERS_QUERY, REMOVE_USER_BY_ID_QUERY } from "common/graphql";

type Return = any;

export const useRemoveUserAPI = (): Return => {
  const [removeUserMutation] = useMutation(REMOVE_USER_BY_ID_QUERY);

  const removeUserById = async (id: number) => {
    await removeUserMutation({
      variables: { id },
      refetchQueries: [{ query: GET_ALL_USERS_QUERY }],
    });
  };

  return { removeUserById };
};
