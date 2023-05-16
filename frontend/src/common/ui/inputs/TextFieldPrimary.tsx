import { TextField as TextFieldMui, TextFieldProps, Typography, styled, Box } from "@mui/material";

type Props = TextFieldProps;

const TextFieldRoot = styled(TextFieldMui)(({ theme }) => ({
  background: theme.palette.grey[50],
  borderRadius: "8px",
  "& .MuiInputBase-root": {
    width: "100%",
    fontSize: 14,
    boxSizing: "border-box",
    height: "48px",
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.grey[200],
        transition: theme.transitions.create(["border-color"]),
      },
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: `1px solid ${theme.palette.grey[200]}`,
    borderRadius: "8px",
  },
  "& .MuiFormHelperText-root": {
    color: theme.palette.error.main,
    margin: "4px 0 0",
    background: "#ffffff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      // borderColor: "#3E68A8",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.grey[200],
      borderWidth: "0.15rem",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.grey[200],
      borderWidth: "0.15rem",
    },
  },
}));

export const TextFieldPrimary = ({ label, sx, ...props }: Props) => (
  <Box sx={sx}>
    {label && (
      <Typography sx={{ mb: "6px" }} variant="subtitle2">
        {label}
      </Typography>
    )}
    <TextFieldRoot {...props} fullWidth />
  </Box>
);
