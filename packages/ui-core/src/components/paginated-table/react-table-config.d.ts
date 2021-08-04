import {
  UseColumnOrderState,
  UseExpandedOptions,
  UseFiltersColumnOptions,
  UseFiltersColumnProps,
  UseGroupByRowProps,
  UsePaginationOptions,
  UsePaginationState,
  UseRowStateCellProps,
  UseSortByColumnOptions,
  UseSortByColumnProps,
  UseSortByOptions,
  UseSortByState,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UsePaginationOptions<D>,
      UseSortByOptions<D>,
      Record<string, any> {}

  export interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseColumnOrderState<D>,
      UsePaginationState<D>,
      UseSortByState<D> {}

  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnOptions<D>,
      UseSortByColumnOptions<D> {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends UseFiltersColumnProps<D>,
      UseSortByColumnProps<D> {}

  export type Cell<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseRowStateCellProps<D>;

  export type Row<
    D extends Record<string, unknown> = Record<string, unknown>
  > = UseGroupByRowProps<D>;
}
