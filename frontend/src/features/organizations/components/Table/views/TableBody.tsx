import { TableBody as TableBodyMui, TableRow, TableCell, Stack, Typography } from "@mui/material";
import { MdModeEdit, MdClear } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IconButtonRouter, IconButton } from "../../IconButton";
import { OrgNameCell } from "./OrgNameCell";

export const TableBody = ({ rows }: any): JSX.Element => {
  const navigate = useNavigate();

  return (
    <TableBodyMui>
      {rows.map((row: any) => {
        const { id, name, icon, type, admins, users, courses } = row;

        return (
          <TableRow hover key={id} onClick={() => navigate(id.toString())}>
            <TableCell id={id} align="left" component="th" scope="row">
              <OrgNameCell name={name} logo={icon} />
            </TableCell>
            <TableCell id={id} align="left" component="th" scope="row">
              <Typography variant="body1" fontWeight={600}>
                {type}
              </Typography>
            </TableCell>
            <TableCell id={id} align="left" component="th" scope="row">
              <Typography variant="body1" fontWeight={600}>
                {admins.length}
              </Typography>
            </TableCell>
            <TableCell id={id} align="left" component="th" scope="row">
              <Typography variant="body1" fontWeight={600}>
                {users.length}
              </Typography>
            </TableCell>
            <TableCell id={id} align="left" component="th" scope="row">
              <Typography variant="body1" fontWeight={600}>
                {courses}
              </Typography>
            </TableCell>
            <TableCell id={id} align="right" component="th" scope="row">
              <Stack spacing={1} direction="row">
                <IconButtonRouter aria-label="edit" size="small" to="/edit">
                  <MdModeEdit fontSize="small" />
                </IconButtonRouter>

                <IconButton aria-label="delete" size="small" onClick={() => console.log("click")}>
                  <MdClear fontSize="small" />
                </IconButton>
              </Stack>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBodyMui>
  );
};
