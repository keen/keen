import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Layout } from '@keen.io/ui-core';

import { Bar } from './bar-chart.utils';

import { Mark } from '../../components';

import { calculateMarkPosition } from './bar-chart.utils';

type Props = {
  bars: Bar[];
  layout?: Layout;
};

const Bars = ({ bars, layout }: Props) => {
  const [activeBar, setActiveBar] = useState(null);

  return (
    <>
      {bars.map(({ key, x, y, width, height, color }: Bar) => (
        <g
          key={key}
          onMouseEnter={() => setActiveBar(key)}
          onMouseLeave={() => setActiveBar(null)}
        >
          <rect
            key={key}
            x={x}
            y={y}
            height={height}
            width={width}
            fill={color}
          />
          <AnimatePresence>
            {activeBar === key && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
              >
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
