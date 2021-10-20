import { extractFormatterType } from '@keen.io/charts-utils';

import { SortByType } from '../../../types';
import { ValueFormatter } from '../types';

export const sortData = (
  data: Record<string, any>,
  sortBy: SortByType,
  formatValue: ValueFormatter
) => {
  const { sort, property } = sortBy;
  const formatPattern = formatValue && formatValue[property];
  if (
    formatPattern &&
    typeof formatPattern === 'string' &&
    extractFormatterType(formatPattern) === 'number'
  ) {
    return data.sort((a: any, b: any) => {
      if (sort === 'ascending') {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
  }
  return data.sort((a: any, b: any) => {
    const aString = a[property].toString();
    const bString = b[property].toString();
    if (sort === 'ascending') {
      return aString.localeCompare(bString, undefined, { caseFirst: 'lower' });
    } else {
      return bString.localeCompare(aString, undefined, { caseFirst: 'upper' });
    }
  });
};
