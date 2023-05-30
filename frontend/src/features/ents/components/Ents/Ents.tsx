import { useEntsAPI, useFilter, usePagination, useSelectTypes } from "../../hooks";
import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";
import { Toolbar } from "../Toolbar";
import { EntsTable } from "../EntsTable";

export const Ents = () => {
  const { selectedTypes, handleSelectTypes } = useSelectTypes();
  const {
    filterOptions,
    handleChangeSearchName,
    handleClearSearchName,
    handleChangeSearchID,
    handleClearSearchID,
  } = useFilter();
  const { paginationOptions, handlePageChange, handlePageSizeChange } = usePagination();
  const { ents, totalCount, loading } = useEntsAPI(selectedTypes, filterOptions, paginationOptions);

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Toolbar
        searchedName={filterOptions.searchedName}
        searchedId={filterOptions.searchedId}
        selectedTypes={selectedTypes}
        handleSelectTypes={handleSelectTypes}
        handleChangeSearchName={handleChangeSearchName}
        handleClearSearchName={handleClearSearchName}
        handleChangeSearchID={handleChangeSearchID}
        handleClearSearchID={handleClearSearchID}
      />

      <EntsTable
        ents={ents}
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
