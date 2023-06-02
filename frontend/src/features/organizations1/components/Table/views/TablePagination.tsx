import {
  TablePagination as TablePaginationMui,
  TablePaginationProps,
  BoxProps,
  styled,
} from "@mui/material";

type Props = TablePaginationProps & BoxProps;

export const TablePagination = styled(TablePaginationMui)<Props>(({ theme }) => ({
  ".MuiTablePagination-selectLabel": {
    fontSize: theme.typography.subtitle1.fontSize,
  },
  ".MuiTablePagination-displayedRows": {
    fontSize: theme.typography.subtitle1.fontSize,
  },
}));
