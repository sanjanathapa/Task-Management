import { get as lodashGet } from "lodash";

// Define types for the parameters and return type of the get function
type SourceType = Record<string, any>;
type CallbackType<T> = (value: T) => any;

export const get = <T>(
  source: SourceType,
  path: string,
  defaultValue: T,
  callback?: CallbackType<T>,
): T | ReturnType<CallbackType<T>> => {
  let value = lodashGet(source, path, defaultValue);

  // Use the default value for specific falsy values
  if (!value) {
    value = defaultValue;
  }

  // If there is a callback passed to process the get value/defaultValue
  if (typeof callback === "function") {
    return callback(value);
  }

  return value;
};
