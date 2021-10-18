import {
  extractFormatterType,
  Formatter,
  formatValue,
} from '@keen.io/charts-utils';

/**
 * Generates table content
 *
 * @param data - data series
 * @param format - format settings
 * @return data collection used to render table body
 *
 */
export const generateTable = (data: Record<string, any>[], format: any) => {
  return data.map((el: Record<string, any>) => {
    let table = {} as Record<string, any>;
    Object.keys(el).map((key: string) => {
      if (format !== null && typeof format === 'object') {
        const formatObj = format && (format as Record<string, any>);
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
              } as any)
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
};
