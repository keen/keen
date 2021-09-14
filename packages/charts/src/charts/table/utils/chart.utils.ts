import {
  Formatter,
  formatValue,
  extractFormatterType,
} from '@keen.io/charts-utils';
import { CellTextAlignment, TableRowData } from '@keen.io/ui-core';
import {
  FormatFunction,
  ValueFormatter,
  HeaderCell,
  FormattedValue,
} from '../types';

/**
 * Generates table header
 *
 * @param data - data series
 * @param format - format settings
 * @return data collection used to render table header
 *
 */
export const generateHeader = (data: Record<string, any>) => {
  const header: HeaderCell[] = [];
  Object.keys(data).map((key: string) => {
    header.push({
      key: key,
      align: typeof data[key] === 'number' ? 'right' : 'left',
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
        const formatter = formatObj[key] && (formatObj[key] as Formatter);
        return (table = {
          ...table,
          [key]: formatter
            ? ({
                value: formatValue(el[key], formatter),
                formatterType:
                  typeof formatter === 'string'
                    ? extractFormatterType(formatter)
                    : undefined,
              } as FormattedValue)
            : el[key],
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

const isFormattedValue = (el: any): el is FormattedValue =>
  typeof el === 'object' && el !== null && 'value' in el;

/**
 * Generates table data with value and cell alignment
 *
 * @param el - data serie
 * @return transformed data
 *
 */
export const generateTableRowData = (
  el: Record<string, any>
): Record<string, TableRowData> => {
  let tableRowData = {} as Record<string, any>;

  Object.keys(el).map((key) => {
    let alignment: CellTextAlignment = 'left';
    let val = el[key];

    if (isFormattedValue(el[key])) {
      const { value, formatterType } = el[key];
      alignment = formatterType === 'number' ? 'right' : 'left';
      val = value;
    }
    if (typeof el[key] === 'number') {
      alignment = 'right';
    }

    return (tableRowData = {
      ...tableRowData,
      [key]: {
        value: val,
        alignment,
      },
    });
  });
  return tableRowData;
};
