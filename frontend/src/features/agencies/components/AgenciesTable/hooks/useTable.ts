import { useState } from "react";

type Return = { pageSize: number; handlePageSizeChange: (newPageSize: number) => void };

export const useTable = (): Return => {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
  };

  return {
    pageSize,
    handlePageSizeChange,
  };
};
