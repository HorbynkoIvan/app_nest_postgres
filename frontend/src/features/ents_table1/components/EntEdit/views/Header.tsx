import { IconButton, Button, Stack, Typography } from "@mui/material";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDeleteEntById } from "../../../hooks";

type Props = {
  id: number;
  name: string;
};

export const Header = ({ name, id }: Props): JSX.Element => {
  const navigate = useNavigate();
  const { deleteEntById } = useDeleteEntById();

  return (
    <Stack justifyContent="space-between" alignItems="center" direction="row" sx={{ pb: 6 }}>
      <Stack direction="row" spacing={3} alignItems="center">
        <IconButton aria-label="delete" size="small" onClick={() => navigate(-1)}>
          <MdArrowBack fontSize="inherit" />
        </IconButton>
        <Typography variant="h2" textTransform="initial" fontWeight={700}>
          {`Entity: ${name}`}
        </Typography>
      </Stack>

      <Button variant="outlined" sx={{ height: 44 }} onClick={() => deleteEntById(id)}>
        <Typography variant="button" textTransform="initial" fontWeight={700}>
          Delete Entity
        </Typography>
      </Button>
    </Stack>
  );
};
