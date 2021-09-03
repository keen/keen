import { CellTextAlignment } from '@keen.io/ui-core';
import { Formatter } from '@keen.io/charts-utils';

export type HeaderCell = {
  key: string;
  align: CellTextAlignment;
};

export type FormatFunction = (value: string | number) => React.ReactNode;

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
