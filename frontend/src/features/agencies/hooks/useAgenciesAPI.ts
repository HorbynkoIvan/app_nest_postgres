import { useQuery } from "@apollo/client";
import { AgencyType } from "common/interfaces";
import { GET_AGENCIES_QUERY } from "common/graphql";

type FilterOptions = {
  searchedName: string;
  searchedId: number | null;
};

type PaginationParams = {
  page: number;
  pageSize: number;
};

type Return = {
  agencies: AgencyType[];
  totalCount: number;
  loading: boolean;
};

export const useAgenciesAPI = (
  selectedTypes: any,
  { searchedName, searchedId }: FilterOptions,
  { page, pageSize }: PaginationParams
): Return => {
  const { data, loading } = useQuery(GET_AGENCIES_QUERY, {
    variables: {
      filterInput: { types: selectedTypes, title: searchedName, id: searchedId },
      paginationInput: { page, pageSize },
    },
  });

  return {
    agencies: data?.getEnts?.agencies ?? [],
    totalCount: data?.getEnts?.totalCount ?? 0,
    loading,
  };
};
