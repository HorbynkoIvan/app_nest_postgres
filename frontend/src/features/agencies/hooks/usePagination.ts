import { useMemo, useState } from "react";

type Return = {
  queryOptions: any;
  handlePageChange: (params: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
};

export const usePagination = (): Return => {
  const [page, setPage] = useState(0); // State for the page number
  const [pageSize, setPageSize] = useState(10); // State for the number of items per page

  const queryOptions = useMemo(
    () => ({
      page: page + 1,
      pageSize,
    }),
    [page, pageSize]
  );

  const handlePageChange = (newPage: number) => {
    console.log(newPage);
    setPage(newPage);
    // handle page change if using server-side pagination
  };

  const handlePageSizeChange = (newPageSize: number) => {
    console.log(newPageSize);
    setPageSize(newPageSize);
    // handle page change if using server-side pagination
  };

  // const handlePageChange = (params: any) => {
  //   const newPage = params.page + 1; // Adjust the page index if needed
  //   const newPerPage = params.pageSize;
  //
  //   setPage(newPage);
  //   setPerPage(newPerPage);
  // };

  return {
    queryOptions,
    handlePageChange,
    handlePageSizeChange,
  };
};
