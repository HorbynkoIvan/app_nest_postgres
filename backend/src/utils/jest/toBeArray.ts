/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeArray(): R;
    }
    interface Expect {
      toBeNotEmptyArray: () => matcherResult;
    }
  }
}

export default (value: ReadonlyArray<unknown>): matcherResult => {
  const pass = value instanceof Array;

  const message = () => `Value "${typeof value}" should be Array`;

  return {
    message,
    pass,
  };
};
