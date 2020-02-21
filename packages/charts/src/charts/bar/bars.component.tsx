import React, { useState } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Layout } from '@keen.io/ui-core';

import { Mark, markMotion } from '../../components';

import { getBarColor } from './utils/bar.utils';
import { calculateMarkPosition } from './utils/mark.utils';

import { Bar, GroupMode, StackMode } from './types';
import { DataSelector } from '../../types';

const transitionStyle = { transition: 'fill .2s ease-in' };

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
};

const Bars = ({
  bars,
  groupMode,
  stackMode,
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
      {bars.map(({ key, selector, x, y, width, height, color }: Bar) => (
        <g
          key={key}
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
          <rect
            key={key}
            x={x}
            y={y}
            height={height}
            width={width}
            style={transitionStyle}
            fill={getBarColor({
              activeBar,
              stackMode,
              barKey: key,
              barSelector: selector,
              color,
              groupMode,
            })}
          />
        </g>
      ))}
      {bars.map(({ key, x, y, width, height, color }: Bar) => (
        <AnimatePresence key={key}>
          {activeBar.key === key && (
            <motion.g {...markMotion} pointerEvents="all">
              <Mark
                {...calculateMarkPosition({ layout, x, y, width, height })}
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
