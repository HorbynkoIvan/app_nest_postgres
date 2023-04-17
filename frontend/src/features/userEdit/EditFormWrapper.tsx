import { UserForm } from "common/components";
import { useUserEditForm } from "./hooks";

export const EditFormWrapper = ({ user }: any) => {
  const formik = useUserEditForm(user);

  return <UserForm formik={formik} />;
};
