import { useQuery } from "@apollo/client";
import { AgencyType } from "common/interfaces";
import { GET_AGENCIES_QUERY } from "common/graphql";

type PaginationParams = {
  page: number;
  pageSize: number;
};

type Return = {
  agencies: AgencyType[];
  totalCount: number;
  loading: boolean;
};

export const useAgenciesAPI = ({ page, pageSize }: PaginationParams): Return => {
  const { data, loading } = useQuery(GET_AGENCIES_QUERY, {
    variables: {
      filterInput: { types: [], title: "" },
      paginationInput: { page, pageSize: pageSize },
    },
  });

  return {
    agencies: data?.getAgencies?.agencies ?? [],
    totalCount: data?.getAgencies?.totalCount ?? 0,
    loading,
  };
};
