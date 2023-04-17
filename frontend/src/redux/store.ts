import { configureStore } from "@reduxjs/toolkit";
import { useMemo } from "react";

import { usersRolesReducer } from "./modules/usersByRole";

export const createStore = (preloadedState = {}): any =>
  configureStore({
    reducer: {
      usersRoles: usersRolesReducer,
    },
    preloadedState,
  });

export function useStore(initialState: any): any {
  return useMemo(() => createStore(initialState), [initialState]);
}
