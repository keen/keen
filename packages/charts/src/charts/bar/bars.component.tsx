import React, { useState } from 'react';
import { transparentize } from 'polished';
import { motion, AnimatePresence } from 'framer-motion';

import { Layout } from '@keen.io/ui-core';

import { Bar } from './bar-chart.utils';
import { Mark } from '../../components';

import { calculateMarkPosition } from './bar-chart.utils';

const markMotion = {
  initial: { opacity: 0.3, scale: 0.2 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3 },
  exit: { opacity: 0, scale: 0.3 },
};

type Props = {
  bars: Bar[];
  onBarMouseEnter: (
    e: React.MouseEvent<SVGGElement, MouseEvent>,
    key: string,
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
      {bars.map(({ key, x, y, width, height, color }: Bar) => (
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
            onBarMouseEnter(e, key, markPosition);
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
