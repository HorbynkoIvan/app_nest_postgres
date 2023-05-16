import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesMockAPI } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";

export const Agencies = () => {
  const { entities, loading } = useAgenciesMockAPI();

  if (loading) return <Loader />;

  return (
    <>
      <PaperWrapper>
        <AgenciesTable entities={entities} />
      </PaperWrapper>
    </>
  );
};
