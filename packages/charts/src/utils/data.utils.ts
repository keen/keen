export const getKeysDifference = (keys: string[], disabledKeys: string[]) =>
  keys.filter((keyName: string) => !disabledKeys.includes(keyName));
