import { Stack, Typography } from "@mui/material";
import { Header, PaperWrapper } from "common/components";
import { useAllUsersAPI } from "./hooks";
import { Table } from "./components";

export const TeamFeature = () => {
  const { users, loading } = useAllUsersAPI();

  if (loading)
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <Typography variant="h1">Loading...</Typography>
      </Stack>
    );

  console.log(users);
  return (
    <>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <PaperWrapper>
        <Table users={users} />
      </PaperWrapper>
    </>
  );
};
