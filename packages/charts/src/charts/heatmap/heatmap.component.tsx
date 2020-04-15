import React from 'react';
import { Layout } from '@keen.io/ui-core';
import { AnimatePresence } from 'framer-motion';

import Block from './block.component';

import { BlockType } from './types';

type Props = {
  blocks: BlockType[];
  padding: number;
  layout: Layout;
  onMouseEnter?: (e: React.MouseEvent, block: BlockType) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
};

const Heatmap = (options: Props) => {
  const { blocks, layout } = options;
  return (
    <AnimatePresence>
      {blocks.map(block => (
        <Block key={`${block.key}.${layout}`} {...options} block={block} />
      ))}
    </AnimatePresence>
  );
};

export default Heatmap;
