import React, { FC } from 'react';
import { motion, MotionStyle, PanInfo } from 'framer-motion';

import { Container } from './control.styles';

import { DragConstraints } from '../types';

type Props = {
  dragDirection: 'x' | 'y';
  dragConstraints: DragConstraints;
  children: React.ReactNode;
  onDrag: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragStart?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
  onDragEnd?: (e: MouseEvent | TouchEvent | PointerEvent) => void;
};

export const Control: FC<Props> = ({
  dragDirection,
  dragConstraints,
  onDragStart,
  onDragEnd,
  onDrag,
  children,
}) => {
  const styles = {
    display: 'inline-block',
    position: 'relative',
  } as MotionStyle;

  return (
    <motion.div
      drag={dragDirection}
      dragConstraints={dragConstraints}
      onDrag={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      dragElastic={0}
      dragMomentum={false}
      style={styles}
    >
      <Container>{children}</Container>
    </motion.div>
  );
};

export default Control;
