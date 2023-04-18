import { Box, Stack, TableContainer, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  MdAdminPanelSettings,
  MdClear,
  MdModeEdit,
  MdSecurity,
  MdVerifiedUser,
} from "react-icons/md";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { BoxScrolled } from "common/components";
import { SelectCheckboxes } from "common/ui";
import { UserType } from "common/interfaces";
import { IconButton } from "../IconButton";
import { useRemoveUserAPI, useSelectRoles } from "../../hooks/";

type Props = {
  users: UserType[];
};

const rolesOptions = [
  { value: "superAdmin", label: "superAdmin" },
  { value: "admin", label: "admin" },
  { value: "staff", label: "staff" },
];

export const Table = ({ users }: Props): JSX.Element => {
  const { selectedValues, handleSelectChange } = useSelectRoles();

  const { removeUserById } = useRemoveUserAPI();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "userName",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "firstName",
      headerName: "FirstName",
      flex: 1,
      renderCell: ({
        row: {
          profile: { firstName },
        },
      }) => firstName,
    },
    {
      field: "lastName",
      headerName: "LastName",
      flex: 1,
      renderCell: ({
        row: {
          profile: { lastName },
        },
      }) => lastName,
    },
    {
      field: "age",
      headerName: "age",
      flex: 1 / 2,
      renderCell: ({
        row: {
          profile: { age },
        },
      }) => age,
    },

    {
      field: "createdAt",
      headerName: "Created",
      flex: 1,
      renderCell: ({ row: { createdAt } }) => moment(createdAt).format("DD.MM.YYYY"),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      flex: 1,
      renderCell: ({ row: { updatedAt } }) => moment(updatedAt).format("DD.MM.YYYY"),
    },
    {
      field: "role",
      headerName: "Role",
      align: "left",
      flex: 1,
      renderCell: ({
        row: {
          profile: { role },
        },
      }) => (
        <Box p="5px" display="flex" alignItems="center" justifyContent={"start"} borderRadius={1}>
          {role === "superAdmin" && <MdAdminPanelSettings size={30} />}
          {role === "admin" && <MdSecurity size={30} />}
          {role === "staff" && <MdVerifiedUser size={30} />}
          <Typography sx={{ ml: "5px" }}>{role}</Typography>
        </Box>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1 / 2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { id } }) => (
        <Stack spacing={1} direction="row">
          <IconButton aria-label="edit" size="small" onClick={() => navigate(id.toString())}>
            <MdModeEdit fontSize="small" />
          </IconButton>

          <IconButton aria-label="delete" size="small" onClick={() => removeUserById(Number(id))}>
            <MdClear fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <Stack direction="row" justifyContent="end">
        <SelectCheckboxes
          sx={{ width: 300, mb: 4 }}
          options={rolesOptions}
          value={selectedValues}
          onChange={handleSelectChange}
          initialLabel="Roles filter"
        />
      </Stack>
      <BoxScrolled>
        <TableContainer sx={{ minWidth: 800, height: "calc(100% - 60px)" }}>
          <DataGrid
            rows={users}
            columns={columns}
            pageSize={10}
            initialState={{
              pagination: {
                pageSize: 5,
              },
            }}
            checkboxSelection
            disableSelectionOnClick
          />
        </TableContainer>
      </BoxScrolled>
    </Box>
  );
};
