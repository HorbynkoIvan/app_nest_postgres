import { TableRow, TableCell } from "@mui/material";

type Props = {
  id: number;
  type: string;
  title: string;
};

export const TableContent = ({ id, type, title }: Props) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell component="th" scope="row">
      {id}
    </TableCell>
    <TableCell align="left">{type}</TableCell>
    <TableCell align="left">{title}</TableCell>
  </TableRow>
);
