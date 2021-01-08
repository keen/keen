import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { randomizeVector } from './utils/animation.utils';

import { Bubble } from './types';
import { DataSelector } from '../../types';

const createBubbleMotion = ({
  x,
  y,
  middlePoint,
  index,
}: {
  x: number;
  y: number;
  index: number;
  middlePoint: [number, number];
}) => {
  const [motionX, motionY] = randomizeVector();
  const [midX, midY] = middlePoint;

  return {
    initial: { opacity: 0, x: midX + motionX, y: midY + motionY },
    animate: { opacity: 0.57, x, y },
    exit: {},
    whileHover: { opacity: 1 },
    transition: { delay: 0.01 * index, ease: 'easeOut', duration: 0.25 },
  };
};

type Props = {
  middlePoint: [number, number];
  bubbles: Bubble[];
  onMouseEnter?: (
    e: React.MouseEvent,
    selectors: { selector: DataSelector; color: string }[]
  ) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Bubbles: FC<Props> = ({
  bubbles,
  middlePoint,
  onMouseEnter,
  onMouseLeave,
}) => (
  <AnimatePresence>
    {bubbles.map(({ key, x, y, radius, color, selector }, idx) => (
      <motion.circle
        key={key}
        r={radius}
        fill={color}
        onMouseMove={(e) =>
          onMouseEnter(e, [
            {
              color,
              selector,
            },
          ])
        }
        onMouseLeave={(e) => {
          onMouseLeave(e);
        }}
        {...createBubbleMotion({ x, y, middlePoint, index: idx })}
      />
    ))}
  </AnimatePresence>
);

export default Bubbles;
