import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';

import { Mark, markMotion } from '../../components';
import BarComponent from './bar.component';
import BarValues from './bar-values.component';

import { getBarColor } from './utils/bar.utils';
import { calculateMarkPosition, setMarkSize } from './utils/mark.utils';

import { Bar } from './types';
import { DataSelector, GroupMode, StackMode } from '../../types';

const barMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
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
};

const Bars = ({
  bars,
  groupMode,
  stackMode,
  showValues,
  valuesAutocolor,
  layout,
  onBarMouseEnter,
  onBarMouseLeave,
}: Props) => {
  const [activeBar, setActiveBar] = useState<{
    selector: DataSelector;
    key: string;
  }>({ selector: [], key: null });

  return (
    <>
      <AnimatePresence>
        {bars.map(({ key, selector, x, y, width, height, color }: Bar) => (
          <motion.g
            key={key}
            {...barMotion}
            onMouseEnter={e => {
              const markPosition = calculateMarkPosition({
                layout,
                x,
                y,
                width,
                height,
              });
              setActiveBar({ key, selector });
              onBarMouseEnter(e, key, { selector, color }, markPosition);
            }}
            onMouseLeave={e => {
              setActiveBar({ selector: [], key: null });
              onBarMouseLeave(e, key);
            }}
          >
            <BarComponent
              key={key}
              x={x}
              y={y}
              height={height}
              width={width}
              color={getBarColor({
                activeBar,
                stackMode,
                barKey: key,
                barSelector: selector,
                color,
                groupMode,
              })}
            />
          </motion.g>
        ))}
      </AnimatePresence>
      {showValues && <BarValues bars={bars} autocolor={valuesAutocolor} />}
      {bars.map(({ key, x, y, width, height, color }: Bar) => (
        <AnimatePresence key={key}>
          {activeBar.key === key && (
            <motion.g {...markMotion} pointerEvents="all">
              <Mark
                {...calculateMarkPosition({ layout, x, y, width, height })}
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
