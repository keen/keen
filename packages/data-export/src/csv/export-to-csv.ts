import { ExportOutput } from '../types';

/**
 * Creates CSV structure from export output.
 *
 * @param data - parsed analysis results
 * @param columnDelimiter - character used as column delimiter
 * @param lineDelimiter - character used to recognize line delimiter
 * @return transformed data
 *
 */
export const exportToCSV = (
  data: ExportOutput = [],
  columnDelimiter = ',',
  lineDelimiter = '\n'
) => {
  let result = '';
  data.forEach((row: Array<string | number>) => {
    const transformedRow = row.map((item) => {
      if (item === null) return 'null';

      const hasDelimeter =
        typeof item === 'string' && item.includes(columnDelimiter);
      if (hasDelimeter) return `"${item}"`;

      return item;
    });
    result += transformedRow.join(columnDelimiter) + lineDelimiter;
  });

  return result;
};
