import { SelectProps, ListItemText, MenuItem, Typography } from "@mui/material";
import { CheckboxGrey } from "common/ui";
import { SelectWrapper } from "./SelectWrapper";
import { SelectOption } from "./interfaces";
import { grey } from "@mui/material/colors";

type Props = SelectProps & {
  options: SelectOption[] | string[];
  initialLabel?: string;
  value: SelectOption[];
};

export const SelectCheckboxes = ({ options, initialLabel, value, ...props }: Props) => (
  <SelectWrapper
    id="demo-multiple-checkbox"
    value={value}
    multiple
    displayEmpty
    renderValue={(selected: any) => (
      <Typography component="span" variant="subtitle2" pl={4} color={grey[600]}>
        {selected.length === 0 ? initialLabel : selected.map((item: any) => item).join(", ")}
      </Typography>
    )}
    MenuProps={{
      anchorOrigin: {
        vertical: 190,
        horizontal: "center",
      },
      transformOrigin: {
        vertical: "bottom",
        horizontal: "center",
      },
    }}
    {...props}>
    {options.map((option: any) => (
      <MenuItem
        key={option.value}
        value={option.value}
        dense
        sx={{
          "&.Mui-selected": { background: "transparent" },
          "&.Mui-selected:hover": { background: "rgba(0, 0, 0, 0.04)" },
        }}>
        <CheckboxGrey label="" checked={value.some((selected: any) => selected === option.value)} />
        <ListItemText>
          <Typography variant="subtitle2" color={`${grey[800]}`}>
            {option.label}
          </Typography>
        </ListItemText>
      </MenuItem>
    ))}
  </SelectWrapper>
);
