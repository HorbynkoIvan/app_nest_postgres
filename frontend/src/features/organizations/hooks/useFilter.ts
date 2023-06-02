import { ChangeEvent, useState } from "react";

type FilterOptions = {
  searchedId: number | null;
};

type Return = {
  filterOptions: FilterOptions;
  handleChangeSearchID: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchID: () => void;
};

export const useFilter = (): Return => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchedId: null,
  });

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
    handleChangeSearchID,
    handleClearSearchID,
  };
};
