import { useState } from "react";

type Return = { pageSize: number; handlePageSizeChange: (newPageSize: number) => void };

export const useTable = (perPage: any): Return => {
  const [pageSize, setPageSize] = useState(perPage);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return {
    pageSize,
    handlePageSizeChange,
  };
};
