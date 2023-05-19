import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesAPI, usePagination } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";
import { Toolbar } from "../Toolbar";

export const Agencies = () => {
  const { queryOptions, handlePageChange, handlePageSizeChange } = usePagination();
  const { agencies, totalCount, loading } = useAgenciesAPI(queryOptions);

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Toolbar
        searched=""
        handleChangeSearch={(searchedVal) => console.log(searchedVal)}
        handleClearSearch={() => console.log("clear")}
      />

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
  );
};
