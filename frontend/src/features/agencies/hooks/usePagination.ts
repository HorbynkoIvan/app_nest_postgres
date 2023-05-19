import { useMemo, useState } from "react";

type QueryOptions = {
  page: number;
  pageSize: number;
};

type Return = {
  queryOptions: QueryOptions;
  handlePageChange: (newPage: number) => void;
  handlePageSizeChange: (newPageSize: number) => void;
};

const PAGINATION_INITIAL_PAGE = 0;
const PAGINATION_INITIAL_PAGE_SIZE = 10; // number of items per page

export const usePagination = (): Return => {
  const [page, setPage] = useState(PAGINATION_INITIAL_PAGE);
  const [pageSize, setPageSize] = useState(PAGINATION_INITIAL_PAGE_SIZE);

  const queryOptions = useMemo(
    () => ({
      page: page + 1,
      pageSize,
    }),
    [page, pageSize]
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return {
    queryOptions,
    handlePageChange,
    handlePageSizeChange,
  };
};
