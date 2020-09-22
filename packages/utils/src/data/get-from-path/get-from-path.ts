/**
 * Get value from object based on specified path selector.
 *
 * @param dataObject - object used in extraction
 * @param selector - selector composed from opject keys
 * @return extracted value
 *
 */
const getFromPath = (
  dataObject: Record<string, any>,
  selector: (string | number)[]
) =>
  selector.reduce((acc, key) => {
    if (acc === null) return dataObject[key];
    if (typeof acc === 'object' && acc !== null) return acc[key];
    return acc;
  }, null);

export default getFromPath;
