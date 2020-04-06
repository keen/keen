import { SortByType } from '@keen.io/ui-core';
import { FormatTypeObject, ValueFormatter } from '../../types';
import { isObject } from 'util';

export const firstCapital = (str: string) => {
  return str.replace(/^\w/, (c: string) => c.toUpperCase());
};

export const sortData = (data: Record<string, any>, sortBy: SortByType) => {
  return data.sort((a: any, b: any) => {
    const nameA = a[sortBy.property];
    const nameB = b[sortBy.property];
    if (nameA < nameB) return sortBy.sort === 'ascending' ? -1 : 1;
    if (nameA > nameB) return sortBy.sort === 'descending' ? -1 : 1;
    return 0;
  });
};

export const copyToClipboard = (value: any) => {
  const placeholder = document.createElement('input');
  placeholder.value = value;
  document.body.appendChild(placeholder);
  placeholder.select();
  document.execCommand('copy');
  document.body.removeChild(placeholder);
};

export const generateHeader = (
  data: Record<string, any>,
  format: FormatTypeObject
) => {
  const header: any = [];
  Object.keys(data).map((key: string) => {
    const formatFunc =
      isObject(format) && format[key] ? format[key] : firstCapital;
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
  data.map((el: any) => {
    let table = {};
    Object.keys(el).map((key: string) => {
      if (isObject(format)) {
        const formatFunc = format[key] && format[key];
        return (table = {
          ...table,
          [key]: format[key] ? formatFunc(el[key]) : el[key],
        });
      }
      return (table = {
        ...table,
        [key]: typeof format === 'function' && format(el[key]),
      });
    });
    return table;
  });
