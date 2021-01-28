/**
 * Extracts signle event by creating flat map from nested properties.
 *
 * @param event - event structure
 * @return type of transformation
 *
 */
export const extractEvent = (event: Record<string, any>) => {
  const data: Record<string, any> = {};
  for (const i in event) {
    if (!event.hasOwnProperty(i)) continue;
    if (typeof event[i] == 'object' && event[i] !== null) {
      const flatObject: Record<string, any> = extractEvent(event[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;
        data[i + '.' + x] = flatObject[x];
      }
    } else {
      data[i] = event[i];
    }
  }
  return data;
};
