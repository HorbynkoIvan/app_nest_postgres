import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Stack, TableContainer } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { MdClear, MdModeEdit, MdPlayArrow } from "react-icons/md";
import { IconButton, DataGrid } from "common/ui";
// import { EntType } from "common/types";

const TABLE_TOOLBAR_HEIGHT = 38;

type EntsTableProps = {
  ents: any;
  loading: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  handlePageSizeChange: (pageSize: number) => void;
  handlePageChange: (page: number) => void;
};

export const EntsTable = ({
  ents,
  loading,
  page,
  pageSize,
  totalCount,
  handlePageSizeChange,
  handlePageChange,
}: EntsTableProps) => {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 / 2, align: "center", disableColumnMenu: true },
    {
      field: "type",
      headerName: "Entity Type",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Entity Title",
      flex: 1,
    },
    {
      field: "dependants",
      headerName: "Dependants",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: ({ row: { parentId } }) =>
        parentId && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            {parentId} <MdPlayArrow />
          </Stack>
        ),
    },
    {
      field: "editDate",
      headerName: "Edit Date",
      flex: 1,
      renderCell: ({ row: { editDate } }) => moment(editDate).format("DD.MM.YYYY"),
    },
    {
      field: "parentId",
      headerName: "Parent ID",
      flex: 1 / 2,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "parentTitle",
      headerName: "Parent Title",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      disableColumnMenu: true,
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
          <IconButton aria-label="edit" size="small" onClick={() => navigate(`${id}`)}>
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
        rows={ents}
        columns={columns}
        // rowCount={totalCount}
        // loading={loading}
        // rowsPerPageOptions={[10, 20, 50]}
        // pagination
        // page={page}
        // pageSize={pageSize}
        // paginationMode="server"
        // onPageSizeChange={handlePageSizeChange}
        // onPageChange={handlePageChange}
        // checkboxSelection={false}
        // disableSelectionOnClick
      />
    </TableContainer>
  );
};
