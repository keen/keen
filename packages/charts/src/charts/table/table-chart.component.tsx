/* eslint-disable react/display-name */
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
  useRowSelect,
  useBlockLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import Measure from 'react-measure';
import { useInView } from 'react-intersection-observer';
import { AnimatePresence } from 'framer-motion';
import { transparentize } from 'polished';

import { useScrollOverflowHandler } from '@keen.io/react-hooks';
import { copyToClipboard } from '@keen.io/charts-utils';
import { TableFooter, SortByType, PER_PAGE_OPTIONS } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';
import { BodyText } from '@keen.io/typography';

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
  TotalRows,
} from './table-chart.styles';
import {
  Body,
  Header,
  CopyCellTooltip,
  SelectedRowsInfo,
  SelectedRowsCopiedInfo,
} from './components';
import { ValueFormatter, CellClickMetadata, TableEvents } from './types';
import {
  generateSelectedRowsCSVData,
  generateHeader,
  generateTable,
  setColumnsOrder,
  sortData,
} from './utils';
import { useTableEvents, useRowsGroupSelection } from './hooks';

import { SELECT_COLUMN_ID } from './constants';
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
  /** Rows selection enabled */
  rowsSelection?: boolean;
  theme: Theme;
  /** Pagination enabled */
  pagination: boolean;
  /** Rows per page */
  rowsPerPage: typeof PER_PAGE_OPTIONS[number];
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
  rowsSelection = false,
  chartEvents,
  columnsNamesMapping = {},
  pagination = true,
  rowsPerPage = PER_PAGE_OPTIONS[3],
}: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const containerRef = useRef(null);
  const componentMounted = useRef(false);

  const [sort, setSort] = useState<SortByType>(null);
  const [columnsWidth, setColumnsWidth] = useState<(number | 'auto')[]>([]);
  const [selectedRowsCopied, setSelectedRowsCopied] = useState(false);

  const { setSelectionOffset, selectionOffset, getSelectionOffsetRange } =
    useRowsGroupSelection({ enabled: rowsSelection });

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

  const columns = React.useMemo(
    () => generateHeader(formattedData[0]),
    [columnsOrder, tableData]
  );

  const indexesOfSelectedColumns = selectedColumns.map(({ index }) => index);
  const activeColumns = new Set(
    [...indexesOfSelectedColumns, hoveredColumn].filter(
      (i) => typeof i === 'number'
    )
  );

  const itemsPerPage = pagination ? rowsPerPage : data.length;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    gotoPage,
    setPageSize,
    toggleRowSelected,
    toggleHideColumn,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, sortBy, selectedRowIds },
  }: any = useTable(
    {
      columns,
      data: formattedData,
      initialState: {
        pageIndex: 0,
        pageSize: itemsPerPage,
        hiddenColumns: rowsSelection ? [] : [SELECT_COLUMN_ID],
      },
      manualSortBy: true,
      disableMultiSort: true,
    } as any,
    useBlockLayout,
    useSortBy,
    usePagination,
    useRowSelect
  );

  useEffect(() => {
    setPageSize(itemsPerPage);
  }, [rowsPerPage, pagination, itemsPerPage, setPageSize]);

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

  const { overflowRight, overflowLeft, scrollHandler } =
    useScrollOverflowHandler(containerRef);
  const tooltipHide = useRef(null);

  const onRowSelect = (
    e: React.MouseEvent<HTMLTableCellElement>,
    rowId: string
  ) => {
    if (e.shiftKey) {
      if (selectionOffset) {
        const selectionRange = getSelectionOffsetRange(rowId);
        if (selectionRange)
          selectionRange.forEach((rowId: string) =>
            toggleRowSelected(rowId, true)
          );
      } else {
        setSelectionOffset(rowId);
      }
    } else {
      toggleRowSelected(rowId);
    }
  };

  const onCellClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    { columnName, columnType, rowId, value, idx }: CellClickMetadata
  ) => {
    if (columnType === 'row-selection' && !enableEditMode) {
      onRowSelect(e, rowId);
    } else if (columnType === 'value') {
      if (enableEditMode) {
        const columns = reduceColumnsSelection(columnName, idx);

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
    }
  };

  useEffect(() => {
    if (componentMounted.current) {
      setColumnsWidth([]);
      toggleHideColumn(SELECT_COLUMN_ID, !rowsSelection);
    } else {
      componentMounted.current = true;
    }
  }, [rowsSelection]);

  useLayoutEffect(() => {
    if (containerRef.current && columnsWidth.length === 0) {
      const headersWidth = Array.from(
        containerRef.current.querySelectorAll('th')
      ).map((header: HTMLTableHeaderCellElement, index) => {
        if (index === 0 && rowsSelection) return 'auto';
        return header.offsetWidth;
      });

      setColumnsWidth(headersWidth);
    }
  }, [rowsSelection, columnsWidth]);

  const selectedRowsIds = Object.keys(selectedRowIds) as unknown as number[];

  const copySelectedRows = () => {
    const selectedRows = selectedRowsIds.map(
      (selectedRowId) => formattedData[selectedRowId]
    );
    const columnsKeys = Object.keys(formattedData[0]);
    const csvData = generateSelectedRowsCSVData({
      selectedRows,
      columnsKeys,
      columnsNamesMapping,
      addColumnNames: selectedRowsIds.length === formattedData.length,
    });
    copyToClipboard(csvData);
    toggleAllRowsSelected(false);
    setSelectedRowsCopied(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => setSelectedRowsCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [selectedRowsCopied]);

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
        <AnimatePresence>
          {selectedRowsIds.length > 0 && (
            <SelectedRowsInfo
              selectedRowsNumber={selectedRowsIds.length}
              onClearRowsSelection={() => toggleAllRowsSelected(false)}
              onCopySelectedRows={() => copySelectedRows()}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {selectedRowsCopied && <SelectedRowsCopiedInfo />}
        </AnimatePresence>
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
            editMode={enableEditMode}
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
            onCellClick={(e, meta) => onCellClick(e, meta)}
            prepareRow={prepareRow}
            backgroundColor={mainColor}
            typography={body.typography}
            isEditMode={enableEditMode}
            columnsWidth={columnsWidth}
            disableValuesSelection={!!selectionOffset}
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
        onResize={({ bounds: { height } }) => setFooterHeight(height)}
      >
        {({ measureRef }) => (
          <TableFooterContainer ref={measureRef}>
            {pagination ? (
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
            ) : (
              <TotalRows>
                <BodyText
                  variant="body2"
                  color={transparentize(0.5, colors.black[500])}
                  enableTextEllipsis
                >
                  {data.length.toLocaleString('en-US')} rows
                </BodyText>
              </TotalRows>
            )}
          </TableFooterContainer>
        )}
      </Measure>
    </TableScrollWrapper>
  );
};

export default TableChart;
