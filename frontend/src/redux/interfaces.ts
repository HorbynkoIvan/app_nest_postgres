import { Action, ThunkAction } from "@reduxjs/toolkit";

export type UsersRolesState = {
  roles: string[];
};

export type RootState = {
  usersRoles: UsersRolesState;
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
