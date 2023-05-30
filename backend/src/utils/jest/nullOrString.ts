/* eslint-disable @typescript-eslint/no-namespace */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      nullOrString(): R;
    }
    interface Expect {
      nullOrString: () => matcherResult;
    }
  }
}

export default (value: null | string): matcherResult => {
  const pass = value === null || typeof value === "string";
  const message = () =>
    pass
      ? `Value ${value} not to be null or string`
      : `Value ${value} to be null or string`;

  return {
    message,
    pass,
  };
};
