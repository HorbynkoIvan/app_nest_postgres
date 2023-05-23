import { Box, Stack, Typography } from "@mui/material";
import { TableDependent } from "./TableDependent";

export const DependentEntities = (): JSX.Element => (
  <Box flex={1}>
    <Stack spacing={4} maxWidth={450}>
      <Typography variant="h4" textTransform="initial" fontWeight={700}>
        Dependent Entities
      </Typography>

      <TableDependent />
    </Stack>
  </Box>
);
