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

const DELAY = 1000;

export const useFilter = (): Return => {
  const [searchedName, setSearchedName] = useState("");
  const [searchedId, setSearchedId] = useState<number | null>(null);

  const debouncedHandleChangeSearchName = debounce((value: string) => {
    setSearchedName(value);
  }, DELAY);

  const debouncedHandleChangeSearchID = debounce((value: number | null) => {
    setSearchedId(value);
  }, DELAY);

  const handleChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedHandleChangeSearchName(value);
  };

  const handleClearSearchName = () => {
    setSearchedName("");
  };

  const handleChangeSearchID = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedHandleChangeSearchID(Number(value));
  };

  const handleClearSearchID = () => {
    setSearchedId(null);
  };

  useEffect(() => {
    return () => {
      debouncedHandleChangeSearchName.cancel();
      debouncedHandleChangeSearchID.cancel();
    };
  }, [debouncedHandleChangeSearchID, debouncedHandleChangeSearchName]);

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
