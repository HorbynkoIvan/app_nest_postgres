import React, { ChangeEvent } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { ENT_TYPES_OPTIONS } from "common/constants";
import { Select, SearchDebounced } from "common/ui";
import { useNavigate } from "react-router-dom";

type Props = {
  searchedName: string;
  searchedId: number | null;
  selectedTypes: any;
  handleSelectTypes: () => void;
  handleChangeSearchName: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChangeSearchID: (event: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearchName: () => void;
  handleClearSearchID: () => void;
};

export const Toolbar = ({
  searchedName,
  searchedId,
  selectedTypes,
  handleSelectTypes,
  handleChangeSearchName,
  handleChangeSearchID,
  handleClearSearchName,
  handleClearSearchID,
}: Props) => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography noWrap variant="h3">
        Entity Manager
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography noWrap overflow="initial">
            Filter by Type
          </Typography>

          <Select
            sx={{ width: 150, height: 35, m: 0 }}
            fullWidth
            value={selectedTypes === null ? "" : selectedTypes}
            onChange={handleSelectTypes}
            placeholder="Select type"
            options={ENT_TYPES_OPTIONS}
          />
        </Stack>

        <SearchDebounced
          minWidth={170}
          maxWidth={170}
          placeholder="Search by Name"
          searched={searchedName}
          handleChangeSearch={handleChangeSearchName}
          handleClearSearch={handleClearSearchName}
        />

        <SearchDebounced
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
            Add Entity
          </Typography>
        </Button>
      </Stack>
    </Stack>
  );
};
