import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesAPI, usePagination } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";

export const Agencies = () => {
  const { queryOptions, handlePageChange, handlePageSizeChange } = usePagination();
  const { agencies, totalCount, loading } = useAgenciesAPI(queryOptions);

  if (loading) return <Loader />;

  return (
    <>
      <PaperWrapper>
        <AgenciesTable
          agencies={agencies}
          page={queryOptions.page - 1}
          pageSize={queryOptions.pageSize}
          totalCount={totalCount}
          loading={loading}
          handlePageSizeChange={handlePageSizeChange}
          handlePageChange={handlePageChange}
        />
      </PaperWrapper>
    </>
  );
};
