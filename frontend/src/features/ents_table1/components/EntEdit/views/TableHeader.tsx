import { TableHead, TableRow, TableCell as TableCellMui, styled } from "@mui/material";

const TableCell = styled(TableCellMui)(() => ({ fontWeight: 800 }));

type Props = {
  category: string;
  symbol: string;
  description: string;
};

export const TableHeader = ({ symbol, category, description }: Props) => (
  <TableHead>
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell>{symbol}</TableCell>
      <TableCell align="left">{category}</TableCell>
      <TableCell align="left">{description}</TableCell>
    </TableRow>
  </TableHead>
);
