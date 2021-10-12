const getTreePropertiesToRecompute = (activeProperty: string) => {
  const propertiesToRecompute: Record<string, boolean> = {};
  let previousProp = '';
  activeProperty.split('.').forEach((property) => {
    if (previousProp != '') {
      previousProp = previousProp + '.' + property;
    } else {
      previousProp = property;
    }
    propertiesToRecompute[previousProp] = true;
  });
  return propertiesToRecompute;
};

export default getTreePropertiesToRecompute;
