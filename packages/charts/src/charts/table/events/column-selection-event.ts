import { classifyColumnData } from '../utils';

import {
  ColumnSelection,
  ValueFormatter,
  ColumnsSelectionEvent,
} from '../types';

type Payload = {
  selectedColumns: { columnName: string; index: number }[];
  formatters: ValueFormatter;
  data: Record<string, any>[];
};

/**
 * Creates columns selection PubSub event
 *
 * @param data - table data
 * @param formatters - column formatters
 * @param selectedColumns - collection of selected columns
 * @return selection event payload
 *
 */
export const createColumnSelectionEvent = ({
  data,
  formatters,
  selectedColumns,
}: Payload): ColumnsSelectionEvent => {
  const selection: ColumnSelection[] = [];

  selectedColumns.forEach(({ columnName }) => {
    const formatter = formatters?.[columnName];
    selection.push({
      name: columnName,
      formatter: typeof formatter === 'string' ? formatter : null,
      dataType: classifyColumnData(columnName, data),
    });
  });

  return {
    eventName: '@table/columns-selected',
    meta: {
      selection,
    },
  };
};
