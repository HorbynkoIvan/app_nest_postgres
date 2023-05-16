import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Stack, TableContainer } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { MdClear, MdModeEdit } from "react-icons/md";
import { IconButton, DataGrid } from "common/ui";
import { useTable } from "./hooks";
import { Toolbar } from "../Toolbar";
import { logDOM } from "@testing-library/react";

const TABLE_TOOLBAR_HEIGHT = 38;

export const AgenciesTable = ({ entities }: any): JSX.Element => {
  const navigate = useNavigate();
  const { pageSize, handlePageSizeChange } = useTable();

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
            {parentId} <PlayArrowIcon />
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
    <>
      <Toolbar
        searched=""
        handleChangeSearch={(searchedVal) => console.log(searchedVal)}
        handleClearSearch={() => console.log("clear")}
      />

      <TableContainer sx={{ minWidth: 800, height: `calc(100% - ${TABLE_TOOLBAR_HEIGHT}px)` }}>
        <DataGrid
          rows={entities}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={(newPage) => {
            console.log(newPage);
            // handle page change if using server-side pagination
          }}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </TableContainer>
    </>
  );
};
