import { Typography, Stack, Avatar } from "@mui/material";
import { palette } from "theme";

type Props = {
  name: string;
  logo: string;
};

export const OrgNameCell = ({ name, logo }: Props): JSX.Element => (
  <Stack spacing={2} direction="row" alignItems="center">
    <Avatar variant="rounded" alt="Remy Sharp" src={logo} sx={{ width: 30, height: 30 }}></Avatar>
    <Typography variant="body1" fontWeight={600} color={palette.primary.main}>
      {name}
    </Typography>
  </Stack>
);
