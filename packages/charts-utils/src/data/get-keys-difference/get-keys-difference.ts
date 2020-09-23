/**
 * Filters keys from collection.
 *
 * @param keys - collection of all keys
 * @param disabledKeys - collection of disabled keys
 * @return collection of keys
 *
 */
const getKeysDifference = (keys: string[], disabledKeys: string[]) =>
  keys.filter((keyName: string) => !disabledKeys.includes(keyName));

export default getKeysDifference;
