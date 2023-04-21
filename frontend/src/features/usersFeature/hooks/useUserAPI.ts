import { useQuery } from "@apollo/client";
import { GET_USER_QUERY } from "common/graphql";
import { useParams } from "react-router-dom";

export const useUserAPI = () => {
  const { userId } = useParams();
  const { data, loading } = useQuery(GET_USER_QUERY, {
    variables: { id: Number(userId) },
  });

  return {
    user: data?.getUser,
    loading,
  };
};
