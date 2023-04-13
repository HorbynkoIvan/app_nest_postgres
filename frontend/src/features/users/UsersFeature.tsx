import { Stack, Typography } from "@mui/material";
import { Header, PaperWrapper } from "common/components";
import { useUsersAPI } from "./hooks";
import { Table } from "./components";

export const UsersFeature = () => {
  const { users, loading } = useUsersAPI();

  if (loading)
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h1">Loading...</Typography>
      </Stack>
    );

  return (
    <>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <PaperWrapper>
        <Table users={users} />
      </PaperWrapper>
    </>
  );
};
