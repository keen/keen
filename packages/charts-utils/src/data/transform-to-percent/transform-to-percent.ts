/**
 * Calculates and transform data series into percents
 *
 * @param data - data series
 * @param keys - keys from data used in calculation
 * @return percent data series
 *
 */
const transformToPercent = (data: Record<string, any>[], keys: string[]) => {
  const maximumValues: number[] = data.map((item: Record<string, number>) =>
    keys.reduce((acc: number, keyName: string) => {
      const value = item[keyName];
      return acc + value;
    }, 0)
  );

  return data.map((item: Record<string, any>, idx: number) => ({
    ...item,
    ...keys.reduce(
      (acc: Record<string, any>, key: string) => ({
        ...acc,
        [key]: (item[key] / maximumValues[idx]) * 100,
      }),
      {}
    ),
  }));
};

export default transformToPercent;
