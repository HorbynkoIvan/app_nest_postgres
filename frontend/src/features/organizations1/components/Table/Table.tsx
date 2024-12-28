import { TableContainer, Table as TableMui, Box } from "@mui/material";
import { BoxScrolled } from "common/ui";
import { TABLE_HEAD } from "./constants";
import { OrganizationType } from "../../interfaces";
import { TableHead, TableBody, TableBodyEmpty, TablePagination, TableToolbar } from "./views";
import { useSortTableHead, useSortTable, useTablePagination, useSearchTable } from "./hooks";

type Props = {
  organizations: OrganizationType[];
};

const TABLE_PAGINATION_HEIGHT = 60;

export const Table = ({ organizations }: Props) => {
  const { rows, searched, isNotFound, handleChangeSearch, handleClearSearch } =
    useSearchTable(organizations);
  const { orderDirection, orderBy, handleRequestSort } = useSortTableHead();
  const { stableSort, getComparator } = useSortTable();
  const filteredRows = stableSort(rows, getComparator(orderDirection, orderBy));
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useTablePagination();

  return (
    <Box sx={{ position: "relative", height: `calc(100% - ${TABLE_PAGINATION_HEIGHT}px)` }}>
      <TableToolbar
        searched={searched}
        handleChangeSearch={handleChangeSearch}
        handleClearSearch={handleClearSearch}
      />

      <BoxScrolled>
        <TableContainer sx={{ minWidth: 800 }}>
          <TableMui>
            <TableHead
              orderDirection={orderDirection}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
            />
            <TableBody
              rows={filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
            />
            {isNotFound && <TableBodyEmpty searched={searched} />}
          </TableMui>
        </TableContainer>
      </BoxScrolled>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={organizations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
