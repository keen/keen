/**
 * Transforms results of extraction analysis.
 *
 * @param ob - Keen API extraction result
 * @return transformed extraction
 *
 */
export const transformExtraction = (ob: Record<string, any>) => {
  const toReturn: Record<string, any> = {};
  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if (typeof ob[i] == 'object' && ob[i] !== null) {
      const flatObject: Record<string, any> = transformExtraction(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
