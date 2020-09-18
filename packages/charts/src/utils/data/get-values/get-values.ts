/**
 * Extract values from data series
 * @param data - data series
 * @param keys - keys from data used to pick values
 * @return collection of extracted values
 */
const getValues = (data: Record<string, any>[], keys: string[]) =>
  data.reduce(
    (acc: number[], item: any) => [
      ...acc,
      ...keys.map((key: string) => item[key]).filter(v => v !== undefined),
    ],
    []
  ) as number[];

export default getValues;
