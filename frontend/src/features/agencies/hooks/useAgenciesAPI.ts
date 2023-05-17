import { useQuery } from "@apollo/client";
import { AgencyType } from "common/interfaces";
import { GET_AGENCIES_QUERY } from "common/graphql";

type Return = {
  agencies: AgencyType[];
  loading: boolean;
};

export const useAgenciesAPI = (): Return => {
  const { data, loading } = useQuery(GET_AGENCIES_QUERY, {
    variables: {
      filterInput: { types: [], title: "Sc" },
      paginationInput: { page: 1, perPage: 10 },
    },
  });

  return {
    agencies: data ? data.getAgencies : [],
    loading,
  };
};
