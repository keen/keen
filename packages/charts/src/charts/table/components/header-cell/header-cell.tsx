import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { SortIndicators } from '../sort-indicators';
import { CellContent, CellWrapper } from './header-cell.styles';

type Props = {
  column: any;
};

export const HeaderCell = ({ column }: Props) => {
  const [isHovered, setHover] = useState(false);
  const [sortMode, setSortMode] = useState(null);
  const showColumnActions = column.isSorted || isHovered;

  useEffect(() => {
    if (column.isSorted) {
      setSortMode(column.isSortedDesc ? 'descending' : 'ascending');
    } else {
      setSortMode(null);
    }
  }, [column.isSortedDesc]);

  return (
    <CellWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      textAlignment={column.align}
    >
      <CellContent textAlignment={column.align}>
        {column.render('Header')}
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
