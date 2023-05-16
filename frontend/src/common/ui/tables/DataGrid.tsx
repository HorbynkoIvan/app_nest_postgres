import { styled } from "@mui/material";
import { DataGrid as DataGridMui, DataGridProps } from "@mui/x-data-grid";

type Props = DataGridProps;

export const DataGrid = styled(DataGridMui)<Props>(() => ({
  // Apply styles to the root container
  "&.MuiDataGrid-root": {
    border: "none",
  },

  // Apply styles to the cells in header
  "& .MuiDataGrid-columnHeader": {
    padding: "8px 16px",
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },

  // Apply styles to the rows
  "& .MuiDataGrid-row": {
    "&:nth-of-type(even)": {
      backgroundColor: "#f9f9f9",
    },
    "&:hover": {
      backgroundColor: "#ebebeb",
    },
  },

  // Apply styles to the cells
  "& .MuiDataGrid-cell": {
    padding: "8px 16px",
    "&:focus, &:focus-within": {
      outline: "none",
    },
  },
}));
