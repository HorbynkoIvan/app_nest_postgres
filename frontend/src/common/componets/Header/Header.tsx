import { Typography, Box } from "@mui/material";

type Props = {
  title: string;
  subtitle: string;
};

export const Header = ({ title, subtitle }: Props) => {
  return (
    <Box mb={4}>
      <Typography variant="h2" fontWeight="bold" sx={{ m: "0 0 5px 0" }}>
        {title}
      </Typography>
      <Typography variant="h5">{subtitle}</Typography>
    </Box>
  );
};
