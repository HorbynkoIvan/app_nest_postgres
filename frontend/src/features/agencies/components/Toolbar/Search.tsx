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
  handleChangeSearch: (value: string) => void;
  handleClearSearch: () => void;
  minWidth: number;
};

export const Search = ({
  searched,
  handleChangeSearch,
  handleClearSearch,
  minWidth,
  ...props
}: Props) => (
  <OutlinedInput
    sx={{ minWidth: minWidth }}
    value={searched}
    onChange={(e) => handleChangeSearch(e.target.value)}
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
