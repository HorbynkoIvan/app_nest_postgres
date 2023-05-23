import { ChangeEvent, useState, useEffect } from "react";
import debounce from "lodash.debounce";

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

const DELAY = 300;

export const useFilter = (): Return => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchedName: "",
    searchedId: null,
  });

  const debouncedHandleChangeSearchName = debounce((value: string) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedName: value,
    }));
  }, DELAY);

  const debouncedHandleChangeSearchID = debounce((value: number | null) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedId: value,
    }));
  }, DELAY);

  const handleChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedHandleChangeSearchName(value);
  };

  const handleClearSearchName = () => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedName: "",
    }));
  };

  const handleChangeSearchID = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedHandleChangeSearchID(+value);
  };

  const handleClearSearchID = () => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      searchedId: null,
    }));
  };

  useEffect(() => {
    return () => {
      debouncedHandleChangeSearchName.cancel();
      debouncedHandleChangeSearchID.cancel();
    };
  }, [debouncedHandleChangeSearchID, debouncedHandleChangeSearchName]);

  return {
    filterOptions,
    handleChangeSearchName,
    handleClearSearchName,
    handleChangeSearchID,
    handleClearSearchID,
  };
};
