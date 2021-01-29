/**
 * Creates CSV structure from parsed analysis results.
 *
 * @param data - parsed analysis results
 * @param columnDelimiter - character used as column delimeter
 * @param lineDelimiter - character used to recognize line delimeter
 * @return transformed data
 *
 */
export const exportToCSV = ({
  data = null,
  columnDelimiter = ',',
  lineDelimiter = '\n',
}: {
  data?: Record<string, any>;
  columnDelimiter?: string;
  lineDelimiter?: string;
}) => {
  let result: string;
  let ctr: number;

  if (data === null || !data.length) {
    return null;
  }

  const keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach((item: Record<string, any>) => {
    ctr = 0;
    keys.forEach((key) => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      let value = item[key];

      if (
        typeof item[key] === 'string' &&
        item[key].includes(columnDelimiter)
      ) {
        value = `"${item[key]}"`;
      }

      if (Array.isArray(item[key])) {
        value = `"${item[key].join(', ')}"`;
      }

      result += value;
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};
