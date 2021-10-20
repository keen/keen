/**
 * Sort columns order based on provided settings
 *
 * @param order - collection of column names
 * @param data - data series
 * @return data with sorted columns
 *
 */
export const setColumnsOrder = (
  order: string[],
  data: Record<string, any>[]
) => {
  const dataKeys = Object.keys(data[0]);
  const filteredOrder = order.filter((o) => dataKeys.includes(o));
  const columnsOrder = [...new Set([...filteredOrder, ...dataKeys])];

  return data.map((item) =>
    columnsOrder.reduce((acc, key) => ({ ...acc, [key]: item[key] }), {})
  );
};
