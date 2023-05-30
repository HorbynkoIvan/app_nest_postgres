/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      checkTypes(...types: ReadonlyArray<any>): R;
    }
    interface Expect {
      checkTypes: (...types: ReadonlyArray<any>) => matcherResult;
    }
  }
}

export default (value: any, ...types: ReadonlyArray<any>): matcherResult => {
  const pass = !!types.find((T) => {
    if (T === "Null" && value === null) {
      return true;
    }

    if (T.name === "Array" && value instanceof Array) {
      return true;
    }

    if (T.name === "Date" && value instanceof Date) {
      return true;
    }

    return T(value) === value;
  });

  const message = () =>
    pass
      ? `Value ${value} not to be ${typeof value}`
      : `Value ${value} to be ${typeof value}`;

  return {
    message,
    pass,
  };
};
