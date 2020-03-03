export const getFromPath = (object: any, selector: (string | number)[]) =>
  selector.reduce((acc, key) => {
    if (acc === null) return object[key];
    if (typeof acc === 'object' && acc !== null) return acc[key];
    return acc;
  }, null);
