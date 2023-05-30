/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { matcherResult } from "./interfaces";

declare global {
  namespace jest {
    interface Matchers<R> {
      checkArrayOfType(Constructor: any): R;
    }
    interface Expect {
      checkArrayOfType: (Constructor: any) => matcherResult;
    }
  }
}

export default (
  value: ReadonlyArray<unknown>,
  Constructor: any,
): matcherResult => {
  const pass = !value.find((v) => Constructor(v) !== v);

  const message = () =>
    pass
      ? `Type of array don't must be ${pass}`
      : `Type of array must be ${pass}`;

  return {
    message,
    pass,
  };
};
