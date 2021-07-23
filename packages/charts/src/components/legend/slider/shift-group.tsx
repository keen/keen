import React, { FC } from 'react';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Node width */
  nodeWidth: number;
  /** Gap between nodes */
  gapWidth: number;
  /** Shift animation */
  shiftAnimation?: MotionProps;
};

const ShiftGroup: FC<Props> = ({ children, nodeWidth, gapWidth }) => (
  <AnimatePresence>
    {React.Children.map(children, (childNode, idx) => (
      <motion.div
        style={{ position: 'absolute', top: '50%' }}
        initial={{ opacity: 0, x: idx * (nodeWidth + gapWidth), y: '-50%' }}
        animate={{ x: idx * (nodeWidth + gapWidth), opacity: 1 }}
        exit={{ x: '-50%', opacity: 0}}
        >
        {childNode}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default ShiftGroup;
