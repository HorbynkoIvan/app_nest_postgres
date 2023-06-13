import { ChangeEvent, useEffect, useMemo, useState } from "react";
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

export const useFilter = (): Return => {
  const [searchedName, setSearchedName] = useState("");
  const [searchedId, setSearchedId] = useState<number | null>(null);

  const handleChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchedName(event.target.value);
  };

  const handleClearSearchName = () => {
    setSearchedName("");
  };

  const handleChangeSearchID = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchedId(value === "" ? null : +value);
  };

  const handleClearSearchID = () => {
    setSearchedId(null);
  };

  const debouncedChangeHandlerName = useMemo(() => debounce(handleChangeSearchName, 1000), []);
  const debouncedChangeHandlerId = useMemo(() => debounce(handleChangeSearchID, 1000), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandlerName.cancel();
      debouncedChangeHandlerId.cancel();
    };
  }, [debouncedChangeHandlerName, debouncedChangeHandlerId]);

  return {
    filterOptions: {
      searchedName,
      searchedId,
    },
    handleChangeSearchName: debouncedChangeHandlerName,
    handleClearSearchName,
    handleChangeSearchID: debouncedChangeHandlerId,
    handleClearSearchID,
  };
};
