import { ChangeEvent, useState } from "react";

type FilterOptions = {
  searchedName: string;
  searchedId: number | null;
};

type Return = {
  filterOptions: FilterOptions;
  handleChangeSearchName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchID: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchName: () => void;
  handleClearSearchID: () => void;
};

export const useFilter = (): Return => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchedName: "",
    searchedId: null,
  });

  const handleChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedName: value,
    }));
  };

  const handleClearSearchName = () => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedName: "",
    }));
  };

  const handleChangeSearchID = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedId: +value,
    }));
  };

  const handleClearSearchID = () => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedId: null,
    }));
  };

  return {
    filterOptions,
    handleChangeSearchName,
    handleClearSearchName,
    handleChangeSearchID,
    handleClearSearchID,
  };
};
