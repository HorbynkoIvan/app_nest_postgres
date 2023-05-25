import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  styled,
  SvgIcon,
} from "@mui/material";
import { MdSearch, MdClear } from "react-icons/md";

type Props = OutlinedInputProps & any;

export const SearchRoot = styled(OutlinedInput)(() => ({
  minWidth: 366,
  "&.Mui-focused": {},
  "& fieldset": {},
}));

export const Search = ({ searched, handleChangeSearch, handleClearSearch }: Props) => (
  <SearchRoot
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
    placeholder="Search by ID"
  />
);
