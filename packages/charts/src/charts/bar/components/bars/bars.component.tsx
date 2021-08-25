import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';

import { Mark, markMotion } from '../../../../components';
import BarComponent from '../bar';
import BarValues from '../bar-values';

import { getBarColor } from '../../utils/bar.utils';
import { calculateMarkPosition, setMarkSize } from '../../utils/mark.utils';

import { Bar } from '../../types';
import { DataSelector, GroupMode, StackMode } from '../../../../types';

export type Props = {
  bars: Bar[];
  onBarMouseEnter: (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    key: string,
    dataSelector: { selector: DataSelector; color: string },
    markPosition: { x: number; y: number }
  ) => void;
  onBarMouseLeave: (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    key: string
  ) => void;
  layout: Layout;
  stackMode: StackMode;
  groupMode: GroupMode;
  showValues: boolean;
  valuesAutocolor: boolean;
  activeKey?: string | null;
  dataSeriesOffset?: [number, number];
};

const Bars = ({
  bars,
  groupMode,
  stackMode,
  showValues,
  valuesAutocolor,
  layout,
  activeKey,
  onBarMouseEnter,
  onBarMouseLeave,
  dataSeriesOffset,
}: Props) => {
  const [activeBar, setActiveBar] = useState<{
    selector: DataSelector;
    key: string;
  }>({ selector: [], key: null });

  return (
    <>
      <AnimatePresence>
        {bars.map(
          ({
            key,
            selector,
            x,
            y,
            width,
            height,
            color,
            value,
            colorOutOfRange,
          }: Bar) => (
            <g
              key={key}
              onMouseEnter={(e) => {
                const markPosition = calculateMarkPosition({
                  layout,
                  x,
                  y,
                  width,
                  height,
                  inPositiveCartesianQuadrant: value > 0,
                });
                setActiveBar({ key, selector });
                onBarMouseEnter(e, key, { selector, color }, markPosition);
              }}
              onMouseLeave={(e) => {
                setActiveBar({ selector: [], key: null });
                onBarMouseLeave(e, key);
              }}
            >
              <BarComponent
                key={key}
                isActive={activeKey && selector.includes(activeKey)}
                layout={layout}
                groupMode={groupMode}
                x={x}
                y={y}
                height={height}
                width={width}
                colorOutOfRange={colorOutOfRange}
                color={getBarColor({
                  activeBar,
                  stackMode,
                  barKey: key,
                  barSelector: selector,
                  color,
                  groupMode,
                })}
                dataSeriesOffset={dataSeriesOffset}
              />
            </g>
          )
        )}
      </AnimatePresence>
      {showValues && <BarValues bars={bars} autocolor={valuesAutocolor} />}
      {bars.map(({ key, x, y, width, height, color, value }: Bar) => (
        <AnimatePresence key={key}>
          {activeBar.key === key && (
            <motion.g {...markMotion} pointerEvents="all">
              <Mark
                {...calculateMarkPosition({
                  layout,
                  x,
                  y,
                  width,
                  height,
                  inPositiveCartesianQuadrant: value > 0,
                })}
                {...setMarkSize({ layout, width, height })}
                color={color}
              />
            </motion.g>
          )}
        </AnimatePresence>
      ))}
    </>
  );
};

export default Bars;
