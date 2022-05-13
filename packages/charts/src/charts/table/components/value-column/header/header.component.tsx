import React, { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { HeaderCellContent } from '../../header-cell-content';
import { SortIndicators } from '../sort-indicators';

import { Container } from './header.styles';
import { TextAlignment } from './types';

type Props = {
  /** Sort active indicator */
  isSorted: boolean;
  /* Descending sort indicator */
  isSortedDescending: boolean;
  /* Text alignment */
  textAlignment: TextAlignment;
  /* Column name after transformation */
  columnName: string;
};

export const Header: FC<Props> = ({
  isSorted,
  isSortedDescending,
  textAlignment,
  columnName,
}) => {
  const [isHovered, setHover] = useState(false);
  const [sortMode, setSortMode] = useState(null);
  const showColumnActions = isSorted || isHovered;
  useEffect(() => {
    if (isSorted) {
      setSortMode(isSortedDescending ? 'descending' : 'ascending');
    } else {
      setSortMode(null);
    }
  }, [isSortedDescending]);

  return (
    <Container
      data-testid="table-value-header"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      textAlignment={textAlignment}
    >
      <HeaderCellContent textAlignment={textAlignment}>
        {columnName}
        <motion.div
          animate={showColumnActions ? { opacity: 1 } : { opacity: 0 }}
          style={
            showColumnActions
              ? { visibility: 'visible' }
              : { visibility: 'hidden' }
          }
          transition={{ delay: 0.1, duration: 0.2 }}
        >
          <SortIndicators sortMode={sortMode} />
        </motion.div>
      </HeaderCellContent>
    </Container>
  );
};
