/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  TableRow,
  Tooltip,
  Text,
  SortMode,
  SortByType,
} from '@keen.io/ui-core';
import {
  getElementOffset,
  hasContentOverflow,
  copyToClipboard,
} from '@keen.io/charts-utils';

import { HeaderRow } from './components';
import { ChartEvents } from '../../events';

import {
  generateHeader,
  generateTable,
  setColumnsOrder,
} from './utils/chart.utils';
import { sortData } from './utils/data.utils';

import { useTableEvents } from './hooks';

import {
  Container,
  TableContainer,
  Table,
  LeftOverflow,
  RightOverflow,
  StyledCol,
} from './table-chart.styles';

import text from './text.json';
import { theme as defaultTheme } from '../../theme';
import { TOOLTIP_HIDE } from './constants';

import { ValueFormatter, TableEvents } from './types';
import { TooltipState, CommonChartSettings } from '../../types';

import { TOOLTIP_MOTION } from '../../constants';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Columns order */
  columnsOrder?: string[];
  /** Table edit mode identicator */
  enableEditMode?: boolean;
  /** Object of formatter functions to format values separately */
  formatValue?: ValueFormatter;
  /** Renaming columns settings */
  columnsNamesMapping?: Record<string, string>;
  /** Chart events communication bus */
  chartEvents?: ChartEvents<TableEvents>;
} & CommonChartSettings;

export const TableChart = ({
  data: tableData,
  columnsOrder,
  formatValue,
  chartEvents,
  columnsNamesMapping = {},
  theme = defaultTheme,
  enableEditMode = false,
}: Props) => {
  const [sort, setSort] = useState<SortByType>(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [{ overflowLeft, overflowRight }, setOverflow] = useState({
    overflowLeft: false,
    overflowRight: false,
  });

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

  const tableRef = useRef(null);
  const containerRef = useRef(null);
  const tooltipHide = useRef(null);

  const calculateMaxScroll = useCallback(() => {
    const { offset, scroll: offsetScroll } = getElementOffset(
      containerRef.current,
      'horizontal'
    );

    setMaxScroll(offsetScroll - offset);
  }, [containerRef]);

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

  const data = useMemo(() => {
    const sortColumns = tableData.length && columnsOrder?.length;
    return sortColumns ? setColumnsOrder(columnsOrder, tableData) : tableData;
  }, [columnsOrder, tableData]);

  const sortedData = sort ? sortData(data, sort) : data;
  const formattedData = formatValue
    ? generateTable(sortedData, formatValue)
    : sortedData;

  const {
    table: { header, body, mainColor },
    tooltip: tooltipSettings,
  } = theme;

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

  const indexesOfSelectedColumns = selectedColumns.map(({ index }) => index);
  const activeColumns = new Set([...indexesOfSelectedColumns, hoveredColumn]);

  return (
    <>
      <Container data-testid="table-chart-plot">
        <TableContainer ref={containerRef} onScroll={scrollHandler}>
          <AnimatePresence>
            {tooltip.visible && (
              <motion.div
                {...TOOLTIP_MOTION}
                initial={{ opacity: 0, x: tooltip.x, y: tooltip.y }}
                animate={{
                  x: tooltip.x,
                  y: tooltip.y,
                  opacity: 1,
                }}
                style={{
                  position: 'absolute',
                  pointerEvents: 'none',
                }}
              >
                <Tooltip mode={tooltipSettings.mode} hasArrow={false}>
                  <Text {...tooltipSettings.labels.typography}>
                    {text.cellCopied}
                  </Text>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
          <Table ref={tableRef}>
            <colgroup>
              {formattedData.map((_: any, idx: number) => (
                <StyledCol
                  key={`col-${idx}`}
                  isHovered={hoveredColumn === idx}
                  isSelected={indexesOfSelectedColumns.includes(idx)}
                />
              ))}
            </colgroup>
            <HeaderRow
              data={generateHeader(data[0])}
              columnsNamesMapping={columnsNamesMapping}
              color={mainColor}
              onSort={({
                propertyName,
                sortMode,
              }: {
                propertyName: string;
                sortMode: SortMode;
              }) =>
                !enableEditMode &&
                setSort({ property: propertyName, sort: sortMode })
              }
              sortOptions={sort && sort}
              typography={header.typography}
              activeColumns={[...activeColumns]}
              {...(enableEditMode && {
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
            <tbody>
              {formattedData.map((el: any, idx: number) => (
                <TableRow
                  key={`${idx}-${el[0]}`}
                  data={el}
                  backgroundColor={mainColor}
                  onCellClick={(e, columnName, value, cellIdx) => {
                    if (enableEditMode) {
                      const columns = reduceColumnsSelection(
                        columnName,
                        cellIdx
                      );

                      publishColumnSelection(data, formatValue, columns);
                      setSelectedColumns(columns);
                    } else {
                      if (tooltipHide.current)
                        clearTimeout(tooltipHide.current);
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
                      }, TOOLTIP_HIDE);
                    }
                  }}
                  activeColumn={hoveredColumn}
                  enableEditMode={enableEditMode}
                  typography={body.typography}
                  {...(enableEditMode && {
                    onCellMouseEnter: (_e, cellIdx) =>
                      setHoveredColumn(cellIdx),
                    onCellMouseLeave: () => setHoveredColumn(null),
                  })}
                />
              ))}
            </tbody>
          </Table>
        </TableContainer>
        {overflowLeft && <LeftOverflow />}
        {overflowRight && <RightOverflow />}
      </Container>
    </>
  );
};

export default TableChart;
