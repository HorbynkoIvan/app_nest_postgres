import { useQuery } from "@apollo/client";
import { AgencyType } from "common/interfaces";
import { GET_AGENCIES_QUERY } from "common/graphql";

type PaginationParams = {
  page: number;
  perPage: number;
};

type Return = {
  agencies: AgencyType[];
  loading: boolean;
};

export const useAgenciesAPI = ({ page, perPage }: PaginationParams): Return => {
  const { data, loading } = useQuery(GET_AGENCIES_QUERY, {
    variables: {
      filterInput: { types: [], title: "" },
      paginationInput: { page, perPage },
    },
  });

  return {
    agencies: data ? data.getAgencies : [],
    loading,
  };
};
