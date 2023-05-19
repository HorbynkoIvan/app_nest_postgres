import { AgenciesTable } from "../AgenciesTable";
import { useAgenciesAPI, useFilter, usePagination } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";
import { Toolbar } from "../Toolbar";

export const Agencies = () => {
  const {
    filterOptions,
    handleChangeSearchName,
    handleClearSearchName,
    handleChangeSearchID,
    handleClearSearchID,
  } = useFilter();
  const { paginationOptions, handlePageChange, handlePageSizeChange } = usePagination();
  const { agencies, totalCount, loading } = useAgenciesAPI(filterOptions, paginationOptions);

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Toolbar
        searchedName={filterOptions.searchedName}
        searchedId={filterOptions.searchedId}
        handleChangeSearchName={handleChangeSearchName}
        handleClearSearchName={handleClearSearchName}
        handleChangeSearchID={handleChangeSearchID}
        handleClearSearchID={handleClearSearchID}
      />

      <AgenciesTable
        agencies={agencies}
        page={paginationOptions.page - 1}
        pageSize={paginationOptions.pageSize}
        totalCount={totalCount}
        loading={loading}
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
      />
    </PaperWrapper>
  );
};
