import { Stack, Button, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { Search } from "./Search";
import { Select } from "../Select";
import React from "react";

type Props = {
  searchedName: string;
  searchedId: number | null;
  handleChangeSearchName: (value: string) => void;
  handleChangeSearchID: (value: string) => void;
  handleClearSearchName: () => void;
  handleClearSearchID: () => void;
};

export const Toolbar = ({
  searchedName,
  searchedId,
  handleChangeSearchName,
  handleChangeSearchID,
  handleClearSearchName,
  handleClearSearchID,
}: Props): JSX.Element => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography noWrap variant="h3">
        Entity Manager
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap overflow={"initial"}>
            Filter by Type
          </Typography>

          <Select
            sx={{ width: 150, height: 35, m: 0 }}
            fullWidth
            defaultValue="system"
            options={["system", "state", "district", "school", "cohort", "other"]}
          />
        </Stack>

        <Search
          minWidth={170}
          placeholder="Search by Name"
          searched={searchedName}
          handleChangeSearch={handleChangeSearchName}
          handleClearSearch={handleClearSearchName}
        />

        <Search
          minWidth={170}
          placeholder="Search by ID"
          searched={searchedId !== null ? searchedId.toString() : ""}
          handleChangeSearch={handleChangeSearchID}
          handleClearSearch={handleClearSearchID}
        />

        <Button variant="contained" color="primary" startIcon={<MdAdd />} size="large" fullWidth>
          <Typography variant="button" noWrap textTransform="initial">
            Add Entity
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
