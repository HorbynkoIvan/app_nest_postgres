import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../interfaces";

const initialState = {
  roles: [],
};

export const usersRoleSlice = createSlice({
  name: "usersRoles",
  initialState,
  reducers: {
    setUsersRolesAction: (state: any, action: PayloadAction<string[]>) => {
      state.roles = action.payload;
    },
  },
});

export const selectorUsersRoles = (state: RootState) => state.usersRoles.roles;

export const { setUsersRolesAction } = usersRoleSlice.actions;

export const usersRolesReducer = usersRoleSlice.reducer;
