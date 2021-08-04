import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { DownArrow, Container } from './sort-indicators.styles';

type Props = {
  /** Sort mode */
  sortMode: 'ascending' | 'descending';
};

export const SortIndicators = ({ sortMode = 'ascending' }: Props) => (
  <Container data-testid="sort-indicators">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: sortMode === 'descending' ? 1 : 0.3,
      }}
    >
      <Icon type="arrow-up" fill={colors.white[500]} width={10} />
    </motion.div>
    <DownArrow
      initial={{ opacity: 0 }}
      animate={{
        opacity: sortMode === 'ascending' ? 1 : 0.3,
      }}
    >
      <Icon type="arrow-down" fill={colors.white[500]} width={10} />
    </DownArrow>
  </Container>
);

export default SortIndicators;
