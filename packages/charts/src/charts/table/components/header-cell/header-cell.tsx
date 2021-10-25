import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { SortIndicators } from '../sort-indicators';
import { CellContent, CellWrapper } from './header-cell.styles';

type Props = {
  isSorted: boolean;
  isSortedDescending: boolean;
  textAlignment: 'left' | 'right';
  columnName: string;
};

export const HeaderCell = ({
  isSorted,
  isSortedDescending,
  textAlignment,
  columnName,
}: Props) => {
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
    <CellWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      textAlignment={textAlignment}
    >
      <CellContent textAlignment={textAlignment}>
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
      </CellContent>
    </CellWrapper>
  );
};
