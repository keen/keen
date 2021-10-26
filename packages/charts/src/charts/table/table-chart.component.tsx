import React, {
  useMemo,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';
import {
  HeaderGroup,
  useBlockLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import Measure from 'react-measure';
import { useInView } from 'react-intersection-observer';

import { useScrollOverflowHandler } from '@keen.io/react-hooks';
import { copyToClipboard } from '@keen.io/charts-utils';
import { TableFooter, SortByType, PER_PAGE_OPTIONS } from '@keen.io/ui-core';

import { Theme, TooltipState } from '../../types';
import { theme as defaultTheme } from '../../theme';

import {
  LeftOverflow,
  RightOverflow,
  TableContainer,
  TableScrollWrapper,
  StyledCol,
  StyledTable,
  TableFooterContainer,
} from './table-chart.styles';
import { Body, Header, CopyCellTooltip } from './components';
import { CellValue, ValueFormatter, TableEvents } from './types';
import {
  generateHeader,
  generateTable,
  setColumnsOrder,
  sortData,
} from './utils';
import { useTableEvents } from './hooks';
import { ChartEvents } from '../../events';

export type Props = {
  data: Record<string, any>[];
  /** Columns order */
  columnsOrder?: string[];
  /** Object of formatter functions to format values separately */
  formatValue?: ValueFormatter;
  /** Table edit mode identicator */
  enableEditMode?: boolean;
  /** Chart events communication bus */
  chartEvents?: ChartEvents<TableEvents>;
  /** Renaming columns settings */
  columnsNamesMapping?: Record<string, string>;
  theme: Theme;
};
export const TOOLTIP_MOTION = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const TableChart = ({
  data: tableData,
  theme = defaultTheme,
  columnsOrder,
  formatValue,
  enableEditMode = false,
  chartEvents,
  columnsNamesMapping = {},
}: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef(null);
  const [sort, setSort] = useState<SortByType>(null);
  const [columnsWidth, setColumnsWidth] = useState<number[]>([]);

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
  const [footerHeight, setFooterHeight] = useState(0);

  const { publishColumnSelection } = useTableEvents({
    chartEvents,
    onDeselectColumns: () => setSelectedColumns([]),
  } as any);
  const [inViewRef, inView] = useInView();

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

  const sortedData = sort ? sortData([...data], sort, formatValue) : data;

  const formattedData = React.useMemo(
    () => generateTable(sortedData, formatValue),
    [sort, formatValue]
  );

  const columns = React.useMemo(() => generateHeader(formattedData[0]), [
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
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  }: any = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageIndex: 0, pageSize: PER_PAGE_OPTIONS[0] },
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

      const { pageX, pageY } = e;

      setTooltip((state) => ({
        ...state,
        visible: true,
        x: pageX,
        y: pageY,
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

  useLayoutEffect(() => {
    if (containerRef.current) {
      const headersWidth = Array.from(
        containerRef.current.querySelectorAll('th')
      ).map((header: HTMLTableHeaderCellElement) => {
        return header.offsetWidth;
      });

      setColumnsWidth(headersWidth);
    }
  }, []);

  return (
    <TableScrollWrapper>
      <TableContainer
        ref={containerRef}
        onScroll={scrollHandler}
        footerHeight={footerHeight}
        isOverflow={!inView}
        data-testid="table-chart-plot"
      >
        <CopyCellTooltip
          tooltipState={tooltip}
          tooltipSettings={tooltipSettings}
        />
        <StyledTable {...getTableProps()} ref={tableRef}>
          <colgroup>
            {headerGroups[0].headers.map((item: HeaderGroup, idx: number) => (
              <StyledCol
                key={`col-${item.Header}-${idx}`}
                isHovered={hoveredColumn === idx}
                isSelected={indexesOfSelectedColumns.includes(idx)}
              />
            ))}
          </colgroup>
          <Header
            headerGroups={headerGroups}
            columnsNamesMapping={columnsNamesMapping}
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
            isEditMode={enableEditMode}
            columnsWidth={columnsWidth}
            activeColumns={[...activeColumns]}
            {...(enableEditMode && {
              onCellMouseEnter: (_e, cellIdx) => setHoveredColumn(cellIdx),
              onCellMouseLeave: () => setHoveredColumn(null),
            })}
          />
        </StyledTable>
        <div ref={inViewRef} />
        {overflowLeft && <LeftOverflow />}
        {overflowRight && <RightOverflow />}
      </TableContainer>
      <Measure
        bounds
        onResize={({ bounds: { height } }) => {
          setFooterHeight(height);
        }}
      >
        {({ measureRef }) => (
          <TableFooterContainer ref={measureRef}>
            <TableFooter
              rows={data.length}
              page={pageIndex + 1}
              totalPages={pageCount}
              itemsPerPage={pageSize}
              onPageChange={(page) => {
                containerRef.current.scrollTop = 0;
                gotoPage(page - 1);
              }}
              onItemsPerPageChange={(pageSize) => {
                containerRef.current.scrollTop = 0;
                setPageSize(pageSize);
                gotoPage(0);
              }}
            />
          </TableFooterContainer>
        )}
      </Measure>
    </TableScrollWrapper>
  );
};

export default TableChart;
