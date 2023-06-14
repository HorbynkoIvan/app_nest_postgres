import { ChangeEvent, useEffect, useState } from "react";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  SvgIcon,
} from "@mui/material";
import { MdSearch, MdClear } from "react-icons/md";

type Props = OutlinedInputProps & {
  searched: string;
  handleChangeSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
  minWidth: number;
  maxWidth: number;
};

export const SearchDebounced = ({
  searched: initialSearchedValue,
  handleChangeSearch,
  handleClearSearch,
  minWidth,
  maxWidth,
  ...props
}: Props) => {
  // Start: Code solves usage problem when we use debounce with controlled components
  const [searched, setSearched] = useState(initialSearchedValue);

  useEffect(() => {
    // Update the 'searched' state when 'initialSearchedValue' changes
    if (searched !== initialSearchedValue) {
      setSearched(initialSearchedValue);
    }
  }, [initialSearchedValue]);

  const internalHandleChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearched(value);
    handleChangeSearch(event);
  };
  // End

  return (
    <OutlinedInput
      sx={{ minWidth: minWidth, maxWidth: maxWidth }}
      value={searched}
      onChange={internalHandleChangeSearch}
      size="small"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="medium">
            <MdSearch />
          </SvgIcon>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment position="end" onClick={handleClearSearch}>
          {searched && (
            <IconButton onClick={handleClearSearch}>
              <MdClear />
            </IconButton>
          )}
        </InputAdornment>
      }
      {...props}
    />
  );
};
