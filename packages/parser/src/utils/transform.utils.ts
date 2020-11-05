export const fillWithEmptyKeys = (
  keys: Set<string>,
  results: Record<string, any>
) => {
  let emptyKeysObject = {};
  keys.forEach(key => {
    emptyKeysObject = {
      ...emptyKeysObject,
      [key]: '',
    };
  });
  return results.map((result: any) => ({
    ...emptyKeysObject,
    ...result,
  }));
};
