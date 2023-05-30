/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeNotEmptyArray(): R;
    }
    interface Expect {
      toBeNotEmptyArray: () => matcherResult;
    }
  }
}

export default (value: ReadonlyArray<unknown>): matcherResult => {
  const pass = value && value.length > 0;

  const message = () => "Array should be don't empty";

  return {
    message,
    pass,
  };
};
