import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../interfaces";

const initialState = {
  roles: [],
};

export const usersRoleSlice = createSlice({
  name: "usersRoles",
  initialState,
  reducers: {
    setUsersRolesAction: (state: any, { payload }: any) => {
      // console.log(
      //   state,
      //   payload.value.map((item: any) => item.label)
      // );
      // console.log(payload);
      state.usersRole.roles = payload;
    },
  },
});

export const selectorUsersRoles = (state: RootState) => state.usersRoles.roles;

export const { setUsersRolesAction } = usersRoleSlice.actions;

export const usersRolesReducer = usersRoleSlice.reducer;
