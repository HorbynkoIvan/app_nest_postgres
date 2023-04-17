import * as ReactRedux from "react-redux";

import type { RootState } from "../interfaces";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useDispatch = ReactRedux.useDispatch;
export const useSelector: ReactRedux.TypedUseSelectorHook<RootState> = ReactRedux.useSelector;
