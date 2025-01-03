import { ReactNode } from "react";
import { TableContainer, Table as TableMui } from "@mui/material";

type Props = {
  children: ReactNode;
};

export const Table = ({ children }: Props) => (
  <TableContainer sx={{ minWidth: 800 }}>
    <TableMui>{children}</TableMui>
  </TableContainer>
);
