import { EntitiesTable } from "../EntitiesTable";
import { useEntitiesMockAPI } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";

export const Entities = () => {
  const { entities, loading } = useEntitiesMockAPI();

  if (loading) return <Loader />;

  return (
    <>
      <PaperWrapper>
        <EntitiesTable entities={entities} />
      </PaperWrapper>
    </>
  );
};
