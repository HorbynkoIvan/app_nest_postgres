import { ChangeEvent } from "react";
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

export const Search = ({
  searched,
  handleChangeSearch,
  handleClearSearch,
  minWidth,
  maxWidth,
  ...props
}: Props) => (
  <OutlinedInput
    sx={{ minWidth: minWidth, maxWidth: maxWidth }}
    value={searched}
    onChange={handleChangeSearch}
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
