import {
  ValueColumnHeader,
  ValueCell,
  SelectRowCell,
  SelectColumnHeader,
} from '../components';

import { SELECT_COLUMN_ID } from '../constants';

const selectionColumn = {
  id: SELECT_COLUMN_ID,
  type: 'row-selection',
  Header: SelectColumnHeader,
  Cell: SelectRowCell,
};

/**
 * Generates table header
 *
 * @param data - data series
 * @return data collection used to render table header
 *
 */
export const generateHeader = (data: Record<string, any>) => {
  const header: any[] = [selectionColumn];

  Object.keys(data).map((key: string) => {
    const formatterType = data[key].formatterType;
    const isNumeric =
      formatterType === 'number' ||
      (typeof data[key].value === 'number' && formatterType !== 'string');
    header.push({
      id: key,
      type: 'value',
      Header: ValueColumnHeader,
      Cell: ValueCell,
      accessor: (d: Record<string, any>) => d[key],
      align: isNumeric ? 'right' : 'left',
    });
  });
  return header;
};
