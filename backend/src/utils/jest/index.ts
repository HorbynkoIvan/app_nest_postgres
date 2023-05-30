import nullOrNumber from "./nullOrNumber";
import nullOrString from "./nullOrString";
import checkArrayOfType from "./checkArrayOfType";
import toBeNotEmptyArray from "./toBeNotEmptyArray";
import checkTypes from "./checkTypes";
import objectKeysTypeInArray from "./objectKeysTypeInArray";
import toBeArray from "./toBeArray";

expect.extend({
  nullOrNumber,
  nullOrString,
  checkArrayOfType,
  toBeNotEmptyArray,
  checkTypes,
  objectKeysTypeInArray,
  toBeArray,
});
