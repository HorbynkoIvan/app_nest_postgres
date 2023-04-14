import {
  Select as SelectMui,
  SelectProps,
  FormControl,
  MenuItem as MenuItemMui,
  styled,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";

type Props = SelectProps & { options: string[] };

const OutlinedInputRoot = styled(OutlinedInput)(({ theme }) => ({
  marginTop: "6px",
  height: 48,
  fontSize: 14,
  background: theme.palette.grey[50],
  borderRadius: "8px",
  "&.Mui-focused": {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.grey[200],
      transition: theme.transitions.create(["border-color"]),
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: "8px",
  },
}));

const MenuItem = styled(MenuItemMui)(({ theme }) => ({
  "&.MuiMenuItem-root": {
    padding: "16px",
    "&.Mui-selected": { background: theme.palette.grey[100] },
    "&.Mui-selected:hover": { background: theme.palette.grey[50] },
  },
}));

const ITEM_HEIGHT = 44;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

export const SelectPrimary = ({ label, options, ...props }: Props) => (
  <div>
    <Typography variant="subtitle2">{label}</Typography>

    <FormControl fullWidth>
      <SelectMui
        {...props}
        id="select"
        IconComponent={MdExpandMore}
        MenuProps={MenuProps}
        input={<OutlinedInputRoot />}>
        {options.map((option) => (
          <MenuItem key={option} value={option} disableRipple>
            {option}
          </MenuItem>
        ))}
      </SelectMui>
    </FormControl>
  </div>
);
