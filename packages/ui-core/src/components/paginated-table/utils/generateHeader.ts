/**
 * Generates table header
 *
 * @param data - data series
 * @return data collection used to render table header
 *
 */
export const generateHeader = (data: Record<string, any>) => {
  const header: any[] = [];
  Object.keys(data).map((key: string) => {
    const formatterType = data[key].formatterType;
    const isNumeric =
      formatterType === 'number' ||
      (typeof data[key] === 'number' && formatterType !== 'string');
    header.push({
      Header: key,
      accessor: key,
      align: isNumeric ? 'right' : 'left',
    });
  });
  return header;
};
