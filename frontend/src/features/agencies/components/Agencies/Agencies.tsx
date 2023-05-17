import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesAPI, usePagination } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";

export const Agencies = () => {
  // const { page, perPage, handlePageChange } = usePagination();
  const { agencies, loading } = useAgenciesAPI({ page: 1, perPage: 10 });

  if (loading) return <Loader />;

  return (
    <>
      <PaperWrapper>
        <AgenciesTable agencies={agencies} />
      </PaperWrapper>
    </>
  );
};
