import {
  Checkbox as CheckboxMui,
  styled,
  CheckboxProps,
  FormControlLabel,
  FormControlLabelProps,
} from "@mui/material";

const BpIcon = styled("span")(({ theme }) => ({
  width: 16,
  height: 16,
  border: `1px ${theme.palette.grey[300]} solid`,
  borderRadius: "4px",
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  width: 16,
  height: 16,
  borderRadius: "4px",
  display: "flex",
  backgroundImage: "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
  "&:before": {
    margin: "auto",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "2px",
    width: 10,
    height: 10,
    content: '""',
  },
}));

type CheckboxMuiProps = Omit<FormControlLabelProps, "control"> & CheckboxProps;

export const Checkbox = ({ ...props }: CheckboxMuiProps) => (
  <FormControlLabel
    {...props}
    control={<CheckboxMui icon={<BpIcon />} checkedIcon={<BpCheckedIcon />} disableRipple />}
  />
);
