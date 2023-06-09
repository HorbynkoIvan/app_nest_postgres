import { useQuery } from "@apollo/client";
import { OrganizationType } from "../interfaces";
import { GET_ORGANIZATIONS_QUERY } from "../graphql";

type Return = {
  orgs: OrganizationType[];
  loading: boolean;
};

export const useOrganizationsAPI = (): Return => {
  const { data, loading } = useQuery(GET_ORGANIZATIONS_QUERY);

  return {
    orgs: data ? data.getOrganizations : [],
    loading,
  };
};
