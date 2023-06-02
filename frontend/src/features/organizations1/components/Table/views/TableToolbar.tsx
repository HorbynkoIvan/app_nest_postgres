import { Stack, Button, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { Search } from "../../Search";

export const TableToolbar = ({
  searched,
  handleChangeSearch,
  handleClearSearch,
}: any): JSX.Element => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography noWrap variant="h3">
        Organization Manager
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Search
          searched={searched}
          handleChangeSearch={handleChangeSearch}
          handleClearSearch={handleClearSearch}
        />

        <Button variant="contained" color="primary" startIcon={<MdAdd />} size="large" fullWidth>
          <Typography variant="button" noWrap textTransform="initial">
            Add Organization
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
