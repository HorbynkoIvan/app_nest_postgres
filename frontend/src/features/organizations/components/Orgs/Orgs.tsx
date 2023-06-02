import { Loader } from "common/components";
import { PaperWrapper } from "common/ui";
import { OrgsTable } from "../OrgsTable";
import { useFilter, useOrganizationsAPI, usePagination } from "../../hooks";
import { Toolbar } from "../Toolbar";

export const Orgs = () => {
  const { filterOptions, handleChangeSearchID, handleClearSearchID } = useFilter();
  const { paginationOptions, handlePageChange, handlePageSizeChange } = usePagination();
  const { orgs, loading } = useOrganizationsAPI();

  // TODO implement paginationOptions after API finished
  console.log(paginationOptions);

  if (loading) return <Loader />;

  return (
    <PaperWrapper>
      <Toolbar
        searchedId={filterOptions.searchedId}
        handleChangeSearchID={handleChangeSearchID}
        handleClearSearchID={handleClearSearchID}
      />

      <OrgsTable
        orgs={orgs}
        page={1}
        pageSize={10}
        totalCount={50}
        loading={loading}
        handlePageSizeChange={handlePageSizeChange}
        handlePageChange={handlePageChange}
      />
    </PaperWrapper>
  );
};
