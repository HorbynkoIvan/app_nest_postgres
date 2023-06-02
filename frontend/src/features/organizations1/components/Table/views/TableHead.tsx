import { MouseEvent } from "react";
import {
  TableHead as TableHeadMui,
  TableRow,
  TableCell,
  TableSortLabel,
  Typography,
} from "@mui/material";

export const TableHead = ({
  headLabel,
  orderDirection,
  orderBy,
  onRequestSort,
}: any): JSX.Element => {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHeadMui>
      <TableRow>
        {headLabel.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            sortDirection={orderBy === headCell.id ? orderDirection : false}>
            {headCell.sortable ? (
              <TableSortLabel
                hideSortIcon={!headCell.sortable}
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? orderDirection : "asc"}
                onClick={createSortHandler(headCell.id)}>
                <Typography variant="subtitle2" fontWeight="bold" whiteSpace="nowrap">
                  {headCell.label}
                </Typography>
              </TableSortLabel>
            ) : (
              <Typography variant="subtitle2" fontWeight="bold" whiteSpace="nowrap">
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadMui>
  );
};
