import { Box, Stack, Typography } from "@mui/material";
import { TableDependent } from "./TableDependent";
import { EntType } from "../../../interfaces";

type Props = {
  dependents: EntType[] | null;
};

export const DependentEntities = ({ dependents }: Props) => (
  <Box flex={1}>
    <Stack spacing={4} maxWidth={450}>
      <Typography variant="h4" textTransform="initial" fontWeight={700}>
        Dependent Entities
      </Typography>

      <Stack justifyContent="center" alignItems="center" height="100%">
        {dependents?.length ? (
          <TableDependent dependents={dependents} />
        ) : (
          <Typography variant="h3" sx={{ textDecoration: "underline" }}>
            No dependent Ents
          </Typography>
        )}
      </Stack>
    </Stack>
  </Box>
);
