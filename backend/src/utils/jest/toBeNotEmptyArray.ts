/* eslint-disable @typescript-eslint/no-namespace */
import { matcherResult } from './interfaces';

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
