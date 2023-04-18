import { SelectChangeEvent } from "@mui/material";
import { useSelector, useActions } from "redux/hooks";
import { selectorUsersRoles, setUsersRolesAction } from "redux/modules/usersByRole";

export const useSelectRoles = (): any => {
  const userRoles = useSelector(selectorUsersRoles);
  const setUsersRoles = useActions(setUsersRolesAction);
  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    setUsersRoles(event.target.value);
  };

  return {
    selectedValues: userRoles,
    handleSelectChange,
  };
};
