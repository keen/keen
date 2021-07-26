import React, { FC } from 'react';
import { AnimatePresence, MotionProps, motion } from 'framer-motion';

type Props = {
  /** React children nodes */
  children: React.ReactNode;
  /** Shift animation */
  shiftAnimation: (idx: number) => MotionProps;
};

const ShiftGroup: FC<Props> = ({ children, shiftAnimation }) => (
  <AnimatePresence>
    {React.Children.map(children, (childNode, idx) => (
      <motion.div style={{ position: 'absolute' }} {...shiftAnimation(idx)}>
        {childNode}
      </motion.div>
    ))}
  </AnimatePresence>
);

export default ShiftGroup;
