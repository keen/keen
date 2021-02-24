/**
 * Sort keys based of series values sum.
 *
 * @param data - data series
 * @param keys - keys used for calculation
 * @return keys sorted from biggest values to smallest
 *
 */

const sortKeysByValuesSum = (data: Record<string, any>[], keys: string[]) => {
  const sumKeys = data.reduce((acc, item) => {
    let idx = 0;
    for (const [key, value] of Object.entries(item).filter((a) =>
      keys.includes(a[0])
    )) {
      if (acc[idx]) {
        acc[idx] = {
          ...acc[idx],
          value: acc[idx].value + Math.abs(value),
        };
      } else {
        acc[idx] = {
          key: key,
          value: Math.abs(value),
        };
      }
      idx++;
    }
    return acc;
  }, []);

  sumKeys.sort(
    (a: { key: string; value: number }, b: { key: string; value: number }) =>
      a.value < b.value ? 1 : -1
  );
  return sumKeys.map((item: { key: string; value: number }) => item.key);
};

export default sortKeysByValuesSum;
