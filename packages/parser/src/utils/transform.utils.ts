export const fillWithEmptyKeys = (
  keys: string[],
  results: Record<string, any>,
  emptyValue: string | number = ''
): Record<string, any>[] => {
  let emptyKeysObject = {};
  keys.forEach((key) => {
    emptyKeysObject = {
      ...emptyKeysObject,
      [key]: emptyValue,
    };
  });
  return results.map((result: any) => ({
    ...emptyKeysObject,
    ...result,
  }));
};
