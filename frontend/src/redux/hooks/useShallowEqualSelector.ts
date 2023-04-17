import { shallowEqual, useSelector } from "react-redux";

export function useShallowEqualSelector(selector: any): any {
  return useSelector(selector, shallowEqual);
}
