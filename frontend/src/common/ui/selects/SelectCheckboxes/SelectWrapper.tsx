import { Select as SelectMui, SelectProps, styled, InputBase as InputBaseMui } from "@mui/material";
import { MdExpandMore } from "react-icons/md";
import { grey } from "@mui/material/colors";

const InputBase = styled(InputBaseMui)(() => ({
  "& .MuiInputBase-input": {
    borderRadius: "8px",
    width: "100%",
  },
}));

export const SelectWrapper = styled((props: SelectProps) => (
  <SelectMui {...props} input={<InputBase />} IconComponent={MdExpandMore} />
))(() => ({
  height: "44px",
  border: `1px solid ${grey[200]}`,
  color: `${grey[800]}`,
  borderRadius: "8px",
  background: "#ffffff",
  "& .MuiSelect-icon": {
    fontSize: "16px",
    color: `${grey[800]}`,
  },
  ".MuiPaper-roo": {
    backgroundColor: "#000000",
  },
}));
