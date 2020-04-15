import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { Mark, CurveType, StepType } from './types';

import { Mark as PointMark, markMotion } from '../../components';

import { GroupMode, StackMode } from '../../types';

const pointMotion = {
  initial: 'hidden',
  animate: 'show',
  variants: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  transition: { delay: 1.2, duration: 0.3 },
};

type Props = {
  marks: Mark[];
  steps: StepType[];
  curve: CurveType;
  groupMode?: GroupMode;
  stackMode?: StackMode;
  onMouseEnter?: (e: React.MouseEvent, mark: Mark) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Marks = ({
  marks,
  onMouseEnter,
  onMouseLeave,
  curve,
  stackMode,
  groupMode,
}: Props) => {
  const [activeMark, setActiveMark] = useState(null);

  return (
    <>
      {marks.map((mark: Mark) => {
        const { key, color, radius, x, y } = mark;
        return (
          <g
            key={key}
            onMouseEnter={e => {
              onMouseEnter(e, mark);
              setActiveMark(key);
            }}
            onMouseLeave={e => {
              onMouseLeave(e);
              setActiveMark(null);
            }}
          >
            <motion.circle
              key={`${key}-${curve}-${stackMode}-${groupMode}`}
              cx={x}
              cy={y}
              r={radius}
              fill={color}
              {...pointMotion}
            />
            <AnimatePresence>
              {activeMark === key && (
                <motion.g {...markMotion}>
                  <PointMark x={x} y={y} color={color} />
                </motion.g>
              )}
            </AnimatePresence>
          </g>
        );
      })}
    </>
  );
};

export default Marks;
