/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { matcherResult } from './interfaces';

declare global {
  namespace jest {
    interface Matchers<R> {
      objectKeysTypeInArray(array: ReadonlyArray<unknown>, schema: Object): R;
    }
    interface Expect {
      objectKeysTypeInArray: (
        array: ReadonlyArray<unknown>,
        schema: Object,
      ) => matcherResult;
    }
  }
}

export default (
  array: ReadonlyArray<unknown>,
  schema: Object,
): matcherResult => {
  // let pass = array && array.length > 0;
  let pass = false;

  array.forEach((state: Object) => {
    expect(state).toMatchObject(schema);
  });
  const message = () =>
    pass ? `Array must be empty` : `Array don't must be empty`;

  return {
    message,
    pass,
  };
};
