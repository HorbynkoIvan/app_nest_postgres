import { Stack, Typography } from "@mui/material";
import { Header, PaperWrapper } from "common/components";
import { useUsersAPI } from "./hooks";
import { Table } from "./components";
import { useSelector } from "redux/hooks";
import { selectorUsersRoles } from "redux/modules/usersByRole";

export const UsersFeature = () => {
  const usersRoles = useSelector(selectorUsersRoles);
  console.log(usersRoles);
  const { users, loading } = useUsersAPI(usersRoles);

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
