import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { select } from 'd3-selection';

import { StyledRect } from './block.styles';

import { BlockType } from './types';

const rectMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const rectHoverMotion = {
  scale: 1.05,
  transition: { duration: 0.3 },
};

type Props = {
  block: BlockType;
  padding: number;
  onMouseEnter?: (e: React.MouseEvent, block: BlockType) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Block = ({ block, padding, onMouseEnter, onMouseLeave }: Props) => {
  const [isActive, setActive] = useState(false);
  const element = useRef(null);

  useLayoutEffect(() => {
    if (isActive && element.current) {
      select(element.current).raise();
    }
  }, [isActive]);

  const { width, height, x, y, color } = block;

  return (
    <motion.g
      ref={element}
      {...rectMotion}
      onMouseEnter={e => {
        onMouseEnter(e, block);
        setActive(true);
      }}
      onMouseMove={e => {
        onMouseEnter(e, block);
      }}
      onMouseLeave={e => {
        onMouseLeave(e);
        setActive(false);
      }}
      whileHover={rectHoverMotion}
    >
      <StyledRect
        dropShadow={isActive}
        width={width - padding}
        height={height - padding}
        x={x + padding / 2}
        y={y + padding / 2}
        fill={color}
        stroke={isActive ? 'white' : 'none'}
        strokeWidth={isActive ? 4 : 0}
      />
    </motion.g>
  );
};
export default Block;
