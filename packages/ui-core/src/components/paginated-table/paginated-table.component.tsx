import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  useTable,
  usePagination,
  useBlockLayout,
  useSortBy,
} from 'react-table';
import { TableContainer, TableScrollWrapper } from './paginated-table.styles';
import { Body, Header, Pagination } from './components';
import { getElementOffset, hasContentOverflow } from '@keen.io/charts-utils';
import {
  LeftOverflow,
  RightOverflow,
} from '@keen.io/charts/dist/charts/table/table-chart.styles';
import { Theme } from '@keen.io/charts';

type Props = {
  data: Record<string, any>[];
  theme: Theme;
};

const PaginatedTable = ({ data, theme }: Props) => {
  const tableRef = useRef(null);
  const containerRef = useRef(null);

  const {
    table: { header, body, mainColor },
    // tooltip: tooltipSettings,
  } = theme;

  const columnNames = Object.keys(data[0]);

  const columns = React.useMemo(
    () =>
      columnNames.map((column) => ({
        Header: column,
        accessor: column,
      })),
    []
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
    state: { pageIndex, pageSize },
  } = useTable(
    { columns, data, initialState: { pageIndex: 0 } },
    useBlockLayout,
    useSortBy,
    usePagination
  );

  const [maxScroll, setMaxScroll] = useState(0);

  const [{ overflowLeft, overflowRight }, setOverflow] = useState({
    overflowLeft: false,
    overflowRight: false,
  });

  const calculateMaxScroll = useCallback(() => {
    const { offset, scroll: offsetScroll } = getElementOffset(
      containerRef.current,
      'horizontal'
    );
    setMaxScroll(offsetScroll - offset);
  }, [containerRef]);

  useEffect(() => {
    const hasOverflow = hasContentOverflow('horizontal', containerRef.current);
    if (hasOverflow) {
      setOverflow((state) => ({
        ...state,
        overflowRight: true,
      }));
    }
    calculateMaxScroll();
  }, []);

  const scrollHandler = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const offset = e.currentTarget.scrollLeft;
      const hasOverflowLeft = offset > 0;
      const hasOverflowRight = offset < maxScroll;

      if (
        hasOverflowLeft !== overflowLeft ||
        hasOverflowRight !== overflowRight
      ) {
        setOverflow({
          overflowLeft: hasOverflowLeft,
          overflowRight: hasOverflowRight,
        });
      }
    },
    [maxScroll, overflowLeft, overflowRight]
  );

  return (
    <TableScrollWrapper>
      <TableContainer ref={containerRef} onScroll={scrollHandler}>
        <table {...getTableProps()} ref={tableRef}>
          <Header
            headerGroups={headerGroups}
            typography={header.typography}
            color={mainColor}
          />
          <Body
            page={page}
            getTableBodyProps={getTableBodyProps}
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
