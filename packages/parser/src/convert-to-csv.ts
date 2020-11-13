export const convertToCSV = ({
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
    keys.forEach(key => {
      if (ctr > 0) {
        result += columnDelimiter;
      }

      result +=
        typeof item[key] === 'string' && item[key].includes(columnDelimiter)
          ? `"${item[key]}"`
          : item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};
