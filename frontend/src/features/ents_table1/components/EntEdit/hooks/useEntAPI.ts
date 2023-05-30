import { useQuery } from "@apollo/client";
import { EntType } from "../../../interfaces";
import { GET_ENT_QUERY } from "../../../graphql";
import { useParams } from "react-router-dom";

type Return = {
  ent: EntType;
  loading: boolean;
};

export const useEntAPI = (): Return => {
  const { entId } = useParams();

  const { data, loading } = useQuery(GET_ENT_QUERY, {
    variables: { id: Number(entId) },
  });

  return {
    ent: data ? data.getEnt : null,
    loading,
  };
};
