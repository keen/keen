/**
 * Generates table header
 *
 * @param data - data series
 * @param format - format settings
 * @return data collection used to render table header
 *
 */
export const generateHeader = (data: Record<string, any>) => {
  const header: any[] = [];
  Object.keys(data).map((key: string) => {
    header.push({
      Header: key,
      accessor: key,
      align: typeof data[key] === 'number' ? 'right' : 'left',
    });
  });
  return header;
};
