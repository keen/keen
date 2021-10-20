// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {
  useBlockLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import { useScrollOverflowHandler } from '@keen.io/react-hooks';
import { copyToClipboard } from '@keen.io/charts-utils';

import { SortByType } from '../../types';
import {
  LeftOverflow,
  RightOverflow,
  TableContainer,
  TableScrollWrapper,
  StyledCol,
  StyledTable,
} from './paginated-table.styles';
import { Body, Header, Pagination, CopyCellTooltip } from './components';
import { CellValue, TooltipState, ValueFormatter, TableEvents } from './types';
import {
  generateHeader,
  generateTable,
  setColumnsOrder,
  sortData,
} from './utils';
import { useTableEvents } from './hooks';
import { ChartEvents } from './events';

type Props = {
  data: Record<string, any>[];
  /** Columns order */
  columnsOrder?: string[];
  /** Object of formatter functions to format values separately */
  formatValue?: ValueFormatter;
  /** Table edit mode identicator */
  enableEditMode?: boolean;
  /** Chart events communication bus */
  chartEvents?: ChartEvents<TableEvents>;
  theme: any;
};
export const TOOLTIP_MOTION = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

const PaginatedTable = ({
  data: tableData,
  theme,
  columnsOrder,
  formatValue,
  enableEditMode = false,
  chartEvents,
}: Props) => {
  const tableRef = useRef(null);
  const containerRef = useRef(null);
  const [sort, setSort] = useState<SortByType>(null);

  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
  });
  const [hoveredColumn, setHoveredColumn] = useState<number>();
  const [selectedColumns, setSelectedColumns] = useState<
    {
      columnName: string;
      index: number;
    }[]
  >([]);

  const { publishColumnSelection } = useTableEvents({
    chartEvents,
    onDeselectColumns: () => setSelectedColumns([]),
  });

  const reduceColumnsSelection = useCallback(
    (columnName: string, columnIndex: number) => {
      const index = selectedColumns.findIndex(
        ({ index }) => columnIndex === index
      );
      const arr = [...selectedColumns];
      if (index > -1) {
        arr.splice(index, 1);
      } else {
        arr.push({ columnName, index: columnIndex });
      }
      return arr;
    },
    [selectedColumns]
  );

  const {
    table: { header, body, mainColor },
    tooltip: tooltipSettings,
  } = theme;

  const data = useMemo(() => {
    const sortColumns = tableData.length && columnsOrder?.length;
    return sortColumns ? setColumnsOrder(columnsOrder, tableData) : tableData;
  }, [columnsOrder, tableData]);

  const sortedData = sort ? sortData(data, sort, formatValue) : data;

  const formattedData = React.useMemo(
    () => (formatValue ? generateTable(sortedData, formatValue) : sortedData),
    [sort, formatValue]
  );

  const columns = React.useMemo(() => generateHeader(sortedData[0]), [
    columnsOrder,
    tableData,
  ]);
  const indexesOfSelectedColumns = selectedColumns.map(({ index }) => index);
  const activeColumns = new Set(
    [...indexesOfSelectedColumns, hoveredColumn].filter(
      (i) => typeof i === 'number'
    )
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  }: any = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageIndex: 0 },
      manualSortBy: true,
      disableMultiSort: true,
    } as any,
    useBlockLayout,
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (sortBy && sortBy.length > 0) {
      setSort({
        property: sortBy[0].id,
        sort: sortBy[0].desc ? 'descending' : 'ascending',
      });
    } else {
      setSort(null);
    }
  }, [sortBy]);

  const {
    overflowRight,
    overflowLeft,
    scrollHandler,
  } = useScrollOverflowHandler(containerRef);
  const tooltipHide = useRef(null);
  const onCellClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    columnName: string,
    value: CellValue,
    cellIdx: number
  ) => {
    if (enableEditMode) {
      const columns = reduceColumnsSelection(columnName, cellIdx);

      publishColumnSelection(data, formatValue, columns);
      setSelectedColumns(columns);
    } else {
      if (tooltipHide.current) clearTimeout(tooltipHide.current);
      copyToClipboard(value);

      const {
        top,
        left,
      }: ClientRect = containerRef.current.getBoundingClientRect();
      const tooltipX = e.pageX - left - window.scrollX;
      const tooltipY = e.pageY - top - window.scrollY;

      setTooltip((state) => ({
        ...state,
        visible: true,
        x: tooltipX,
        y: tooltipY,
      }));

      tooltipHide.current = setTimeout(() => {
        setTooltip((state) => ({
          ...state,
          visible: false,
          x: 0,
          y: 0,
        }));
      }, 1500);
    }
  };

  return (
    <TableScrollWrapper>
      <TableContainer ref={containerRef} onScroll={scrollHandler}>
        <CopyCellTooltip
          tooltipState={tooltip}
          tooltipSettings={tooltipSettings}
        />
        <StyledTable {...getTableProps()} ref={tableRef}>
          <colgroup>
            {headerGroups[0].headers.map((item, idx: number) => (
              <StyledCol
                key={`col-${item.Header}-${idx}`}
                isHovered={hoveredColumn === idx}
                isSelected={indexesOfSelectedColumns.includes(idx)}
              />
            ))}
          </colgroup>
          <Header
            headerGroups={headerGroups}
            typography={header.typography}
            color={mainColor}
            activeColumns={[...activeColumns]}
            {...(enableEditMode &&
              publishColumnSelection && {
                onEditModeClick: (_e, columnName, cellIdx) => {
                  const selectedColumns = reduceColumnsSelection(
                    columnName,
                    cellIdx
                  );
                  publishColumnSelection(data, formatValue, selectedColumns);

                  setSelectedColumns(selectedColumns);
                },
                onCellMouseEnter: (_e, cellIdx) => setHoveredColumn(cellIdx),
                onCellMouseLeave: () => setHoveredColumn(null),
              })}
          />
          <Body
            page={page}
            getTableBodyProps={getTableBodyProps}
            onCellClick={(e, columnName, columnValue, cellIdx) =>
              onCellClick(e, columnName, columnValue, cellIdx)
            }
            prepareRow={prepareRow}
            backgroundColor={mainColor}
            typography={body.typography}
            activeColumns={[...activeColumns]}
            {...(enableEditMode && {
              onCellMouseEnter: (_e, cellIdx) => setHoveredColumn(cellIdx),
              onCellMouseLeave: () => setHoveredColumn(null),
            })}
          />
        </StyledTable>
        {overflowLeft && <LeftOverflow />}
        {overflowRight && <RightOverflow />}
      </TableContainer>
      <Pagination
        gotoPage={gotoPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageCount={pageCount}
        pageIndex={pageIndex}
        pageSize={pageSize}
        pageOptions={pageOptions}
        setPageSize={setPageSize}
      />
    </TableScrollWrapper>
  );
};

export default PaginatedTable;
