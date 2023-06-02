import { useNavigate } from "react-router-dom";
import { Stack, TableContainer } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MdClear, MdModeEdit } from "react-icons/md";
import { IconButton, DataGrid } from "common/ui";
import { OrganizationType } from "../../interfaces";
import { OrgNameCell } from "./OrgNameCell";

const TABLE_TOOLBAR_HEIGHT = 38;

type OrgsTableProps = {
  orgs: OrganizationType[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageChange: (page: number) => void;
};

export const OrgsTable = ({
  orgs,
  loading,
  page,
  pageSize,
  totalCount,
  handlePageSizeChange,
  handlePageChange,
}: OrgsTableProps): JSX.Element => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: "organization",
      headerName: "Organization",
      flex: 1,
      headerAlign: "left",
      align: "left",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { image, title } }) => <OrgNameCell name={title} logo={image} />,
    },
    {
      field: "id",
      headerName: "ID",
      flex: 1 / 4,
      headerAlign: "center",
      align: "center",
      disableColumnMenu: true,
    },
    {
      field: "admins",
      headerName: "Admins",
      flex: 1 / 2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => Math.floor(Math.random() * (25 - 0 + 1)),
    },
    {
      field: "users",
      headerName: "Users",
      flex: 1 / 2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { users } }) => users.length,
    },
    {
      field: "courses",
      headerName: "Courses",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => Math.floor(Math.random() * (10 - 0 + 1)),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { id } }) => (
        <Stack spacing={1} direction="row">
          <IconButton aria-label="edit" size="small" onClick={() => navigate(`${id}/edit`)}>
            <MdModeEdit fontSize="small" />
          </IconButton>

          <IconButton aria-label="delete" size="small" onClick={() => console.log(Number(id))}>
            <MdClear fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  return (
    <TableContainer sx={{ minWidth: 800, height: `calc(100% - ${TABLE_TOOLBAR_HEIGHT}px)` }}>
      <DataGrid
        rows={orgs}
        rowCount={totalCount}
        loading={loading}
        rowsPerPageOptions={[10, 20, 50]}
        pagination
        page={page}
        pageSize={pageSize}
        paginationMode="server"
        onPageSizeChange={handlePageSizeChange}
        onPageChange={handlePageChange}
        columns={columns}
        checkboxSelection={false}
        disableSelectionOnClick
      />
    </TableContainer>
  );
};
