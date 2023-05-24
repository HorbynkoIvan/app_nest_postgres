import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export const useSelectTypes = (): any => {
  const [types, setTypes] = useState([]);
  const handleSelectTypes = (event: SelectChangeEvent<any>) => {
    setTypes(event.target.value);
  };

  return {
    selectedTypes: types,
    handleSelectTypes,
  };
};
