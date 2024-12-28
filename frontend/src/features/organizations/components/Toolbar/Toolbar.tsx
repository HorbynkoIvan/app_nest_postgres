import React, { ChangeEvent } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { Search } from "./Search";
import { useNavigate } from "react-router-dom";

type Props = {
  searchedId: number | null;
  handleChangeSearchID: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchID: () => void;
};

export const Toolbar = ({ searchedId, handleChangeSearchID, handleClearSearchID }: Props) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography noWrap variant="h3">
        Organization Manager
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Search
          minWidth={170}
          maxWidth={170}
          placeholder="Search by ID"
          searched={searchedId !== null ? searchedId.toString() : ""}
          handleChangeSearch={handleChangeSearchID}
          handleClearSearch={handleClearSearchID}
        />

        <Button
          variant="contained"
          color="primary"
          startIcon={<MdAdd />}
          size="large"
          fullWidth
          onClick={() => navigate("create")}>
          <Typography variant="button" noWrap textTransform="initial">
            Add Organization
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
