import { TableContainer, Table, TableBody } from "@mui/material";
import { TableContent, TableHeader } from "../views";

const contents = [
  { type: "School", title: "6h Street Academy" },
  { type: "School", title: "# 453" },
  { type: "School", title: "AB # 411" },
];

export const TableDependent = () => {
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHeader symbol="#" category="Type" description="Title" />
        <TableBody>
          {contents.map(({ title, type }, index) => (
            <TableContent key={index} title={title} type={type} number={index} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
