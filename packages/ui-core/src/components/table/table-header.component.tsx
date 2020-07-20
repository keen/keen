import React, { FC, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

import { Container, Content } from './table-header.styles';

import SortIndicators from './sort-indicators.component';

import { SortByType, SortMode } from '../../types';

type Props = {
  /** Header background color */
  backgroundColor: string;
  /** Column property name */
  propertyName: string;
  /** Column header title */
  children: React.ReactNode;
  /** Table layout during resize */
  isColumnDragged: boolean;
  /** Sort settings */
  sortOptions?: SortByType;
  /** Column sort event handler */
  onSort?: (sortMeta: { propertyName: string; sortMode: SortMode }) => void;
};

const TableHeader: FC<Props> = ({
  children,
  backgroundColor,
  propertyName,
  onSort,
  isColumnDragged,
  sortOptions,
}) => {
  const [isHovered, setHover] = useState(false);
  const [columnMeta, setState] = useState({
    sortMode: null,
  });

  const { sortMode } = columnMeta;

  const sortHandler = useCallback(() => {
    onSort({ propertyName, sortMode: sortMode ? sortMode : 'ascending' });
    const updatedSortMode =
      sortMode === 'descending' ? 'ascending' : 'descending';
    setState(state => ({ ...state, sortMode: updatedSortMode }));
  }, [propertyName, sortMode, onSort]);

  const sortApplied = sortOptions && sortOptions.property === propertyName;
  const showColumnActions =
    sortApplied || (!isColumnDragged && isHovered && onSort);

  return (
    <>
      <Container
        backgroundColor={backgroundColor}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={() => onSort && !isColumnDragged && sortHandler()}
      >
        <Content>
          {children}
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
        </Content>
      </Container>
    </>
  );
};

export default TableHeader;
