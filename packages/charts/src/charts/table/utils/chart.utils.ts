import { FormatFunction, ValueFormatter, HeaderCell } from '../types';

/**
 * Generates table header
 *
 * @param data - data series
 * @param format - format settings
 * @return data collection used to render table header
 *
 */
export const generateHeader = (
  data: Record<string, any>,
  format: Record<string, FormatFunction>
) => {
  const header: HeaderCell[] = [];
  Object.keys(data).map((key: string) => {
    const formatFunc =
      format !== null && typeof format === 'object' && format[key]
        ? format[key]
        : null;

    header.push({
      key: key,
      value: formatFunc ? formatFunc(key) : key,
    });
  });
  return header;
};

/**
 * Generates table content
 *
 * @param data - data series
 * @param format - format settings
 * @return data collection used to render table body
 *
 */
export const generateTable = (
  data: Record<string, any>[],
  format: ValueFormatter
) =>
  data.map((el: Record<string, any>) => {
    let table = {} as Record<string, any>;
    Object.keys(el).map((key: string) => {
      if (format !== null && typeof format === 'object') {
        const formatObj = format && (format as Record<string, FormatFunction>);
        const formatFunc = formatObj[key] && formatObj[key];
        return (table = {
          ...table,
          [key]: formatFunc ? formatFunc(el[key]) : el[key],
        });
      }
      return (table = {
        ...table,
        [key]: format instanceof Function && format(el[key]),
      });
    });
    return table;
  });

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
