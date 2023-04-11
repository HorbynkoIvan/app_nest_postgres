import { TableContainer, Box, Typography, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import { BoxScrolled } from "common/components";
import { UserType } from "../../interfaces";
import moment from "moment";
import { MdClear, MdModeEdit } from "react-icons/md";
import { IconButton } from "../IconButton";
import { useRemoveUserAPI } from "../../hooks/useRemoveUserAPI";
import { useNavigate } from "react-router-dom";

type Props = {
  users: UserType[];
};

export const Table = ({ users }: Props): JSX.Element => {
  const { removeUserById } = useRemoveUserAPI();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "created",
      flex: 1,
      renderCell: ({ row: { createdAt } }: any) => moment(createdAt).format("DD.MM.YYYY"),
    },
    {
      field: "updatedAt",
      headerName: "updated",
      flex: 1,
      renderCell: ({ row: { updatedAt } }: any) => moment(updatedAt).format("DD.MM.YYYY"),
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      renderCell: ({ row: { role } }: any) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            borderRadius={1}>
            {role === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {role === "manager" && <SecurityOutlinedIcon />}
            {role === "user" && <LockOpenOutlinedIcon />}
            <Typography sx={{ ml: "5px" }}>{role}</Typography>
          </Box>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1 / 2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { id } }) => {
        return (
          <Stack spacing={1} direction="row">
            <IconButton aria-label="edit" size="small" onClick={() => navigate(id.toString())}>
              <MdModeEdit fontSize="small" />
            </IconButton>

            <IconButton aria-label="delete" size="small" onClick={() => removeUserById(Number(id))}>
              <MdClear fontSize="small" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <BoxScrolled>
        <TableContainer sx={{ minWidth: 800, height: "100%" }}>
          <DataGrid checkboxSelection rows={users} columns={columns} pageSize={10} />
        </TableContainer>
      </BoxScrolled>
    </Box>
  );
};
