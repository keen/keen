import React, { FC, useState } from 'react';
import Measure from 'react-measure';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { ItemsPerPage } from './components';
import Pagination from '../pagination';
import {
  Container,
  PaginationContainer,
  RowsContainer,
  PerPageContainer,
} from './table-footer.styles';

import { PerPageType } from './types';
import { COMPACT_VIEW } from './constants';

type Props = {
  /** Number of rows */
  rows: number;
  /** Current page indicator */
  page?: number;
  /** Number of total pages */
  totalPages: number;
  /** Items per page value */
  itemsPerPage?: PerPageType;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Click event handler */
  onItemsPerPageChange: (option: PerPageType) => void;
};

const TableFooter: FC<Props> = ({
  rows,
  page = 1,
  totalPages,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [isCompactView, setCompactView] = useState(false);

  return (
    <Measure
      bounds
      onResize={({ bounds: { width } }) => {
        setCompactView(width <= COMPACT_VIEW);
      }}
    >
      {({ measureRef }) => (
        <Container
          isCompactView={isCompactView}
          role="rowgroup"
          ref={measureRef}
        >
          <RowsContainer isCompactView={isCompactView}>
            <BodyText
              variant="body2"
              color={transparentize(0.5, colors.black[500])}
              enableTextEllipsis
            >
              {rows.toLocaleString('en-US')} rows
            </BodyText>
          </RowsContainer>
          {totalPages > 1 && (
            <PaginationContainer isCompactView={isCompactView}>
              <Pagination
                page={page}
                totalPages={totalPages}
                onChange={onPageChange}
              />
            </PaginationContainer>
          )}
          <PerPageContainer isCompactView={isCompactView}>
            <ItemsPerPage
              value={itemsPerPage}
              onChange={(option) => onItemsPerPageChange(option)}
            />
          </PerPageContainer>
        </Container>
      )}
    </Measure>
  );
};

export default TableFooter;
