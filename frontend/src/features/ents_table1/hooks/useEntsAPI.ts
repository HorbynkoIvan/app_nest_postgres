import { useQuery } from "@apollo/client";
import { EntType } from "common/interfaces";
import { GET_ENTS_QUERY } from "common/graphql";

type FilterOptions = {
  searchedName: string;
  searchedId: number | null;
};

type PaginationParams = {
  page: number;
  pageSize: number;
};

type Return = {
  ents: EntType[];
  totalCount: number;
  loading: boolean;
};

export const useEntsAPI = (
  selectedTypes: any,
  { searchedName, searchedId }: FilterOptions,
  { page, pageSize }: PaginationParams
): Return => {
  const { data, loading } = useQuery(GET_ENTS_QUERY, {
    variables: {
      filterInput: { types: selectedTypes, title: searchedName, id: searchedId },
      paginationInput: { page, pageSize },
    },
  });

  return {
    ents: data?.getEnts?.ents ?? [],
    totalCount: data?.getEnts?.totalCount ?? 0,
    loading,
  };
};
