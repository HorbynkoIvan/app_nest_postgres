import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  details: string;
};

export const DetailsItem = ({ title, details }: Props) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle1" textTransform="initial" fontWeight={700}>
      {title}
    </Typography>
    <Typography variant="subtitle1" textTransform="initial">
      {details}
    </Typography>
  </Stack>
);
