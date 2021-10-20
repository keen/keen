import { Formatter, PatternFormatterDataType } from '@keen.io/charts-utils';

export type CellValue = string | number | boolean | Date | string[] | number[];
export type DataSelector = (number | string)[];
export type CellTextAlignment = 'left' | 'right';

export type TooltipState = {
  visible: boolean;
  selectors: { selector: DataSelector; color: string }[];
  x: number;
  y: number;
};

export type FormattedValue = {
  value: string | number | boolean | Date;
  formatterType?: PatternFormatterDataType;
};

export type ValueFormatter = Record<string, Formatter>;

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
