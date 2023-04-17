import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

export const useSelectRoles = (): any => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    setSelectedValues(event.target.value);
  };

  const isSelected = (value: string) => {
    return selectedValues.indexOf(value) !== -1;
  };

  return {
    selectedValues,
    handleSelectChange,
    isSelected,
  };
};
