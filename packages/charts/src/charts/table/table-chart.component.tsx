import React, { useState, useRef, useEffect, useCallback } from 'react';
import ColumnResizer from 'column-resizer';
import { AnimatePresence, motion } from 'framer-motion';
import { TableRow, Tooltip, Text } from '@keen.io/ui-core';
import { colors } from '@keen.io/colors';

import HeaderRow from './header-row.component';

import { generateHeader, generateTable, sortData } from './table.utils';
import { getElementOffset, hasOverflow } from '../../utils/elements';
import { copyToClipboard } from '../../utils/text';

import {
  Container,
  TableContainer,
  Table,
  LeftOverflow,
  RightOverflow,
} from './table-chart.styles';

import text from './text.json';
import { theme as defaultTheme } from '../../theme';
import { DRAG_CLASS, TOOLTIP_HIDE } from './constants';

import { FormatFunction, ValueFormatter } from './types';
import { TooltipState, CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: Record<string, any>[];
  /** Main color */
  color: string;
  /** Object of functions to format headers separately */
  formatHeader?: Record<string, FormatFunction>;
  /** Format function for values, or object of functions to format values separately */
  formatValue?: ValueFormatter;
  /** Resize table layout event handler */
  onResize?: () => void;
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const TableChart = ({
  data,
  color = colors.blue['500'],
  formatHeader,
  formatValue,
  onResize,
  theme = defaultTheme,
}: Props) => {
  const [sort, setSort] = useState(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [{ overflowLeft, overflowRight }, setOverflow] = useState({
    overflowLeft: false,
    overflowRight: false,
  });

  const [isColumnDragged, setColumnDragged] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
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

  const formatData = formatValue ? generateTable(data, formatValue) : data;
  const sortedData = sort ? sortData(formatData, sort) : formatData;

  const {
    table: { header, body },
    tooltip: tooltipSettings,
  } = theme;

  useEffect(() => {
    new ColumnResizer(tableRef.current, {
      liveDrag: true,
      flush: true,
      resizeMode: 'overflow',
      draggingClass: DRAG_CLASS,
      onResize: () => {
        calculateMaxScroll();
        setColumnDragged(false);
        onResize && onResize();
      },
      onDrag: () => {
        if (!isColumnDragged) setColumnDragged(true);
      },
    });
  }, [onResize, calculateMaxScroll]);

  useEffect(() => {
    const hasContentOverflow = hasOverflow('horizontal', containerRef.current);
    if (hasContentOverflow) {
      setOverflow(state => ({
        ...state,
        overflowRight: true,
      }));
    }
    calculateMaxScroll();
  }, []);

  return (
    <>
      <Container>
        <TableContainer ref={containerRef} onScroll={scrollHandler}>
          <AnimatePresence>
            {tooltip.visible && (
              <motion.div
                {...tooltipMotion}
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
            <HeaderRow
              data={generateHeader(data[0], formatHeader)}
              isColumnDragged={isColumnDragged}
              color={color}
              onSort={({ propertyName, sortMode }) =>
                setSort({ property: propertyName, sort: sortMode })
              }
              sortOptions={sort && sort}
              typography={header.typography}
            />
            {sortedData.map((el: any, idx: number) => (
              <TableRow
                key={`${idx}-${el[0]}`}
                data={el}
                backgroundColor={color}
                onCellClick={(e, value) => {
                  if (tooltipHide.current) clearTimeout(tooltipHide.current);
                  copyToClipboard(value);

                  const {
                    top,
                    left,
                  }: ClientRect = containerRef.current.getBoundingClientRect();
                  const tooltipX = e.pageX - left - window.scrollX;
                  const tooltipY = e.pageY - top - window.scrollY;

                  setTooltip(state => ({
                    ...state,
                    visible: true,
                    x: tooltipX,
                    y: tooltipY,
                  }));

                  tooltipHide.current = setTimeout(() => {
                    setTooltip(state => ({
                      ...state,
                      visible: false,
                      x: 0,
                      y: 0,
                    }));
                  }, TOOLTIP_HIDE);
                }}
                isColumnDragged={isColumnDragged}
                typography={body.typography}
              />
            ))}
          </Table>
        </TableContainer>
        {overflowLeft && <LeftOverflow />}
        {overflowRight && <RightOverflow />}
      </Container>
    </>
  );
};

export default TableChart;