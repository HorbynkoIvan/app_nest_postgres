import { useState } from "react";

type Return = {
  page: number;
  perPage: number;
  handlePageChange: (params: any) => void;
};

export const usePagination = (): Return => {
  const [page, setPage] = useState(1); // State for the page number
  const [perPage, setPerPage] = useState(20); // State for the number of items per page

  const handlePageChange = (params: any) => {
    const newPage = params.page + 1; // Adjust the page index if needed
    const newPerPage = params.pageSize;

    setPage(newPage);
    setPerPage(newPerPage);
  };

  return {
    page,
    perPage,
    handlePageChange,
  };
};
