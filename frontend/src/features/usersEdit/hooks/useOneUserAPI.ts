import { useQuery } from "@apollo/client";
import { GET_ONE_USER_QUERY } from "common/graphql";
import { useParams } from "react-router-dom";

export const useOneUserAPI = () => {
  const { userId } = useParams();
  const { data, loading } = useQuery(GET_ONE_USER_QUERY, {
    variables: { id: Number(userId) },
  });

  return {
    user: data?.getOneUser,
    loading,
  };
};
