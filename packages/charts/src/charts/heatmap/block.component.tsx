import React, { useState, useRef } from 'react';
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
  scale: 1.1,
  transition: { duration: 0.3 },
};

type Props = {
  block: BlockType;
  padding: number;
  onMouseEnter?: (e: React.MouseEvent, block: BlockType) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Block = ({ block, padding, onMouseEnter, onMouseLeave }: Props) => {
  const [activeBlock, setActiveBlock] = useState(null);
  const element = useRef(null);
  const { key, width, height, x, y, color } = block;
  const isActive = activeBlock === key;

  return (
    <motion.g
      ref={element}
      {...rectMotion}
      onMouseEnter={e => {
        onMouseEnter(e, block);
        setActiveBlock(key);
        select(element.current).raise();
      }}
      onMouseMove={e => {
        onMouseEnter(e, block);
      }}
      onMouseLeave={e => {
        onMouseLeave(e);
        setActiveBlock(null);
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
