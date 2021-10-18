// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import React, { useMemo, useRef, useState } from 'react';
import {
  useBlockLayout,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';

import { useScrollOverflowHandler } from '@keen.io/react-hooks';
import { copyToClipboard } from '@keen.io/charts-utils';

import {
  LeftOverflow,
  RightOverflow,
  TableContainer,
  TableScrollWrapper,
} from './paginated-table.styles';
import { Body, Header, Pagination } from './components';
import { CopyCellTooltip } from './components';
import { CellValue, TooltipState, ValueFormatter } from './types';
import { generateHeader, generateTable, setColumnsOrder } from './utils';

type Props = {
  data: Record<string, any>[];
  /** Columns order */
  columnsOrder?: string[];
  /** Object of formatter functions to format values separately */
  formatValue?: ValueFormatter;
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
}: Props) => {
  const tableRef = useRef(null);
  const containerRef = useRef(null);

  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
  });

  const {
    table: { header, body, mainColor },
    tooltip: tooltipSettings,
  } = theme;

  const data = useMemo(() => {
    const sortColumns = tableData.length && columnsOrder?.length;
    return sortColumns ? setColumnsOrder(columnsOrder, tableData) : tableData;
  }, [columnsOrder, tableData]);

  const formattedData = React.useMemo(
    () => (formatValue ? generateTable(data, formatValue) : data),
    [data, formatValue]
  );

  const columns = React.useMemo(() => generateHeader(data[0]), [
    columnsOrder,
    tableData,
  ]);

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
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageIndex: 0 },
    },
    useBlockLayout,
    useSortBy,
    usePagination
  );

  const {
    overflowRight,
    overflowLeft,
    scrollHandler,
  } = useScrollOverflowHandler(containerRef);
  const tooltipHide = useRef(null);
  const onCellClick = (
    e: React.MouseEvent<HTMLTableCellElement>,
    columnName: string,
    value: CellValue
  ) => {
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
  };

  return (
    <TableScrollWrapper>
      <TableContainer ref={containerRef} onScroll={scrollHandler}>
        <CopyCellTooltip
          tooltipState={tooltip}
          tooltipSettings={tooltipSettings}
        />
        <table {...getTableProps()} ref={tableRef}>
          <Header
            headerGroups={headerGroups}
            typography={header.typography}
            color={mainColor}
          />
          <Body
            page={page}
            getTableBodyProps={getTableBodyProps}
            onCellClick={(e, columnName, columnValue) =>
              onCellClick(e, columnName, columnValue)
            }
            prepareRow={prepareRow}
            backgroundColor={mainColor}
            typography={body.typography}
          />
        </table>
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
