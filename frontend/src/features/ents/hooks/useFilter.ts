import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
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
  const [searchedName, setName] = useState("");
  const [searchedId, setId] = useState<number | null>(null);

  const handleChangeSearchName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    console.log(value);
    setName(value);
  };

  const handleClearSearchName = () => {
    setName("");
  };

  const handleChangeSearchID = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const parsedId = Number(value); // Преобразовываем значение в число
    setId(isNaN(parsedId) ? null : parsedId); // Если парсинг не удался, устанавливаем null
  };

  const handleClearSearchID = () => {
    setId(null);
  };

  const debouncedChangeHandlerName = useCallback(debounce(handleChangeSearchName, 300), []);
  const debouncedChangeHandlerId = useCallback(debounce(handleChangeSearchID, 300), []);

  // const debouncedChangeHandlerName = useMemo(() => debounce(handleChangeSearchName, 300), []);
  // const debouncedChangeHandlerId = useMemo(() => debounce(handleChangeSearchID, 300), []);

  useEffect(() => {
    return () => {
      debouncedChangeHandlerName.cancel();
      debouncedChangeHandlerId.cancel();
    };
  }, []);

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
