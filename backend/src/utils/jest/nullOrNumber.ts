/* eslint-disable @typescript-eslint/no-namespace */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      nullOrNumber(): R;
    }
    interface Expect {
      nullOrNumber: () => matcherResult;
    }
  }
}

export default (value: null | number): matcherResult => {
  const pass = value === null || typeof value === "number";
  const message = () =>
    pass
      ? `Value ${value} not to be null or number`
      : `Value ${value} to be null or number`;

  return {
    message,
    pass,
  };
};
