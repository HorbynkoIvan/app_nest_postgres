import { useState } from "react";

type Return = {
  rows: any;
  searched: string;
  handleChangeSearch: (value: string) => void;
  handleClearSearch: () => void;
  isNotFound: boolean;
};

export const useSearchTable = (originalRows: any): Return => {
  const [rows, setRows] = useState(originalRows);
  const [searched, setSearched] = useState("");

  const handleChangeSearch = (searchedVal: string) => {
    setSearched(searchedVal);
    const filteredRows = originalRows.filter((row: any) => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const handleClearSearch = () => {
    setSearched("");
    handleChangeSearch("");
  };

  const isNotFound = !rows.length && !!searched;

  return {
    rows,
    searched,
    isNotFound,
    handleChangeSearch,
    handleClearSearch,
  };
};
