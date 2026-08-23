/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-namespace */
import { matcherResult } from './interfaces';

declare global {
  namespace jest {
    interface Matchers<R> {
      objectKeysTypeInArray(array: ReadonlyArray<unknown>, schema: object): R;
    }
    interface Expect {
      objectKeysTypeInArray: (
        array: ReadonlyArray<unknown>,
        schema: object,
      ) => matcherResult;
    }
  }
}

export default (
  array: ReadonlyArray<unknown>,
  schema: object,
): matcherResult => {
  // let pass = array && array.length > 0;
  let pass = false;

  array.forEach((state: object) => {
    expect(state).toMatchObject(schema);
  });
  const message = () =>
    pass ? `Array must be empty` : `Array don't must be empty`;

  return {
    message,
    pass,
  };
};
