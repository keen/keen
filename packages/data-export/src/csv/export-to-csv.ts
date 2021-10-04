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
    result += row.join(columnDelimiter) + lineDelimiter;
  });

  return result;
};
