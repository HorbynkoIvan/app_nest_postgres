import { TableBody, TableRow, TableCell, Typography } from "@mui/material";

type Props = {
  searched: string;
};

export const TableBodyEmpty = ({ searched }: Props) => (
  <TableBody>
    <TableRow>
      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
        <Typography variant="h2" paragraph>
          Not found
        </Typography>
        <Typography variant="subtitle1">
          No results found for{" "}
          <Typography variant="h6" component="span" fontWeight="bold">
            {searched}
          </Typography>
        </Typography>
      </TableCell>
    </TableRow>
  </TableBody>
);
