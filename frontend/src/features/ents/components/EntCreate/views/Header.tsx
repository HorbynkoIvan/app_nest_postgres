import { IconButton, Stack, Typography } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ pb: 6 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <IconButton aria-label="delete" size="small" onClick={() => navigate(-1)}>
          <MdArrowBack fontSize="inherit" />
        </IconButton>
        <Typography variant="h2" textTransform="initial" fontWeight={700}>
          Create New Entity
        </Typography>
      </Stack>
    </Stack>
  );
};
