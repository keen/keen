import { Formatter, PatternFormatterDataType } from '@keen.io/charts-utils';

export type CellValue = string | number | boolean | Date | string[] | number[];
export type DataSelector = (number | string)[];
export type CellTextAlignment = 'left' | 'right' | 'center';

export type FormattedValue = {
  value: string | number | boolean | Date;
  formatterType?: PatternFormatterDataType;
};

export type ValueFormatter = Record<string, Formatter>;

export type ColumnType = 'row-selection' | 'value';

export type CellClickMetadata = {
  columnName: string;
  columnType: ColumnType;
  rowId: string;
  value: CellValue;
  idx: number;
};

export type ColumnSelection = {
  name: string;
  formatter: string | null;
  dataType: 'string' | 'number' | 'datetime' | 'boolean';
};

export type ColumnsSelectionEvent = {
  eventName: '@table/columns-selected';
  meta: { selection: ColumnSelection[] };
};

export type TableEvents =
  | ColumnsSelectionEvent
  | { eventName: '@table/deselect-columns' };
