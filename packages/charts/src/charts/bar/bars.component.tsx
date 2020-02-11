import React, { useState } from 'react';
import { transparentize } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';

import { Layout } from '@keen.io/ui-core';

import { Bar } from './bar-chart.utils';
import { Mark, markMotion } from '../../components';

import { calculateMarkPosition } from './bar-chart.utils';

import { DataSelector } from '../../types';

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
  layout?: Layout;
};

const Bars = ({ bars, layout, onBarMouseEnter, onBarMouseLeave }: Props) => {
  const [activeBar, setActiveBar] = useState(null);
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
            setActiveBar(key);
            onBarMouseEnter(e, key, { selector, color }, markPosition);
          }}
          onMouseLeave={e => {
            setActiveBar(null);
            onBarMouseLeave(e, key);
          }}
        >
          <rect
            key={key}
            x={x}
            y={y}
            height={height}
            width={width}
            fill={activeBar === key ? transparentize(0.05, color) : color}
          />
          <AnimatePresence>
            {activeBar === key && (
              <motion.g {...markMotion} pointerEvents="all">
                <Mark
                  {...calculateMarkPosition({ layout, x, y, width, height })}
                  color={color}
                />
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      ))}
    </>
  );
};

export default Bars;
