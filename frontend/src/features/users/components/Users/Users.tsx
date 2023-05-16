import { Header, Loader } from "common/components";
import {  PaperWrapper } from "common/ui";
import { Table } from "../../components";
import { useSelector } from "redux/hooks";
import { selectorUsersRoles } from "redux/modules/usersByRole";
import { useUsersAPI } from "../../hooks";

export const Users = () => {
  const usersRoles = useSelector(selectorUsersRoles);
  const { users, loading } = useUsersAPI(usersRoles);

  if (loading) return <Loader />;

  return (
    <>
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <PaperWrapper>
        <Table users={users} />
      </PaperWrapper>
    </>
  );
};
