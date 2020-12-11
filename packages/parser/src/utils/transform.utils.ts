export const fillWithEmptyKeys = (
  keys: Set<string>,
  results: Record<string, any>,
  emptyValue: string | number = ''
) => {
  let emptyKeysObject = {};
  keys.forEach(key => {
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
