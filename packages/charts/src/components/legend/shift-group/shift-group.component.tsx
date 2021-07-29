import React, { FC } from 'react';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Shift animation */
  shiftAnimation: (idx: number) => MotionProps;
  /** Slider direction */
  direction: number;
};

const ShiftGroup: FC<Props> = ({ children, shiftAnimation, direction }) => (
  <AnimatePresence custom={direction}>
    {React.Children.map(children, (childNode, idx) => (
      <motion.div
        transition={{ x: { type: 'spring', stiffness: 300, damping: 30 } }}
        custom={direction}
        style={{ position: 'absolute' }}
        {...shiftAnimation(idx)}
      >
        {childNode}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default ShiftGroup;
