/*
 * To get the value from local storage that matches the given key
 * @param {string} key
 * @returns The value of the key argument
 */
const parseLocalStorageJSON = (key: string) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid key");
  }

  const item = localStorage.getItem(key);
  if (item === null) return null;

  /**
   * Handle non-string value with JSON.parse.
   * Catch string value and return it
   */
  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
};

/**
 * To set the key-value pair to local storage
 * @param {string} key
 * @param {any} value
 * @returns N/A
 */
const setToLocalStorage = (key: string, value: string | object) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid key");
  }

  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
};
