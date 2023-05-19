import { useState } from "react";

type FilterOptions = {
  searchedName: string;
  searchedId: number | null;
};

type Return = {
  filterOptions: FilterOptions;
  handleChangeSearchName: (value: string) => void;
  handleChangeSearchID: (value: string) => void;
  handleClearSearchName: () => void;
  handleClearSearchID: () => void;
};

export const useFilter = (): Return => {
  const [searchedName, setSearchedName] = useState("");
  const [searchedId, setSearchedId] = useState<number | null>(null);

  const handleChangeSearchName = (value: string) => {
    setSearchedName(value);
  };

  const handleClearSearchName = () => {
    setSearchedName("");
  };

  const handleChangeSearchID = (value: string) => {
    setSearchedId(Number(value));
  };

  const handleClearSearchID = () => {
    setSearchedId(null);
  };

  return {
    filterOptions: {
      searchedName,
      searchedId,
    },
    handleChangeSearchName,
    handleClearSearchName,
    handleChangeSearchID,
    handleClearSearchID,
  };
};
