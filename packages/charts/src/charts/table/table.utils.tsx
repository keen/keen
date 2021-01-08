import { SortByType } from '@keen.io/ui-core';
import { isObject } from 'util';

import { firstCapital } from '../../utils/text';

import { FormatFunction, ValueFormatter, HeaderCell } from './types';

export const sortData = (data: Record<string, any>, sortBy: SortByType) => {
  return data.sort((a: any, b: any) => {
    const nameA = a[sortBy.property];
    const nameB = b[sortBy.property];
    if (nameA < nameB) return sortBy.sort === 'ascending' ? -1 : 1;
    if (nameA > nameB) return sortBy.sort === 'descending' ? -1 : 1;
    return 0;
  });
};

export const generateHeader = (
  data: Record<string, any>,
  format: Record<string, FormatFunction>
) => {
  const header: HeaderCell[] = [];
  Object.keys(data).map((key: string) => {
    const formatFunc =
      isObject(format) && format[key]
        ? format[key]
        : (firstCapital as FormatFunction);
    header.push({
      key: key,
      value: formatFunc(key),
    });
  });
  return header;
};

export const generateTable = (
  data: Record<string, any>[],
  format: ValueFormatter
) =>
  data.map((el: Record<string, any>) => {
    let table = {} as Record<string, any>;
    Object.keys(el).map((key: string) => {
      if (isObject(format)) {
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
