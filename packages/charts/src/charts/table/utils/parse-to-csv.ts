export const parseToCSV = (
  data: Record<string, any> = [],
  columnDelimiter = ',',
  lineDelimiter = '\n'
) => {
  let result = '';
  data.forEach((row: Array<string | number>) => {
    const transformedRow = row.map((item) => {
      if (item === null) return 'null';
      return item;
    });
    result += transformedRow.join(columnDelimiter) + lineDelimiter;
  });

  return result;
};
