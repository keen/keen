import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Mark as MarkType } from './line-chart.utils';

import { Mark } from '../../components';

type Props = {
  marks: MarkType[];
  color: string;
  markRadius: number;
};

const Marks = ({ marks, color, markRadius }: Props) => {
  const [activeMark, setActiveMark] = useState(null);

  return (
    <>
      {marks.map(({ key, x, y }: MarkType) => (
        <g
          key={key}
          onMouseEnter={() => setActiveMark(key)}
          onMouseLeave={() => setActiveMark(null)}
        >
          <circle cx={x} cy={y} r={markRadius} fill={color} />
          <AnimatePresence>
            {activeMark === key && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                exit={{ opacity: 0 }}
              >
                <Mark x={x} y={y} color={color} />
              </motion.g>
            )}
          </AnimatePresence>
        </g>
      ))}
    </>
  );
};

export default Marks;
