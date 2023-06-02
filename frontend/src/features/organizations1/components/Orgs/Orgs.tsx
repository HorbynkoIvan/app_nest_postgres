import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";
import { Table } from "../Table";
import { useOrganizationsAPI } from "../../hooks";

export const Orgs = () => {
  const { organizations, loading } = useOrganizationsAPI();

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Table organizations={organizations} />
    </PaperWrapper>
  );
};
