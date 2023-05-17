import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesMockAPI, useAgenciesAPI } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";

export const Agencies = () => {
  // const { entities, loading } = useAgenciesMockAPI();
  const { agencies, loading } = useAgenciesAPI();

  if (loading) return <Loader />;

  return (
    <>
      <PaperWrapper>
        <AgenciesTable entities={agencies} />
      </PaperWrapper>
    </>
  );
};
