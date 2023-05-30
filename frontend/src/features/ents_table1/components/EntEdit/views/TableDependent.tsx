import { TableContainer, Table, TableBody } from "@mui/material";
import { TableContent, TableHeader } from "../views";
import { EntType } from "../../../interfaces";

type Props = {
  dependents: EntType[] | null;
};

export const TableDependent = ({ dependents }: Props): JSX.Element => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHeader symbol="#" category="Type" description="Title" />
        <TableBody>
          {dependents?.map(({ id, title, type }) => (
            <TableContent key={id} title={title} type={type} id={id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
