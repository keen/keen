const getFromPath = (
  dataObject: Record<string, any>,
  selector: (string | number)[]
) =>
  selector.reduce((acc, key) => {
    if (acc === null) return dataObject[key];
    if (typeof acc === 'object' && acc !== null) return acc[key];
    return acc;
  }, null);

const setValue = (obj: Record<string, any>, path: string, value: string) => {
  const keys = path.split('.');
  let objectCopy = obj;

  const isPathExist = getFromPath(objectCopy, keys);

  while (keys.length - 1) {
    const key = keys.shift();
    if (!(key in objectCopy)) objectCopy[key] = {};
    objectCopy = objectCopy[key];
  }

  const key = isPathExist ? `${keys[0]} (node)` : keys[0];
  objectCopy[key] = [path, value];
};

/**
 * Creates tree from schema properties.
 *
 * @NOTES: reverse() is applied to support schema inconsistenty
 * and properties of list type
 *
 * @param properties - schema properties
 * @return tree object
 *
 */
const createTree = (properties: Record<string, any>) =>
  Object.keys(properties)
    .sort()
    .reverse()
    .reduce((acc, key) => {
      const propertyType = properties[key];
      setValue(acc, key, propertyType);
      return acc;
    }, {});

export default createTree;
