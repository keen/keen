import React, { FC } from 'react';
import { transparentize } from 'polished';
import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';

import { ItemsPerPage } from './components';
import Pagination from '../pagination';
import { Container, PaginationContainer } from './table-footer.styles';

import { PerPageType } from './types';

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
}) => (
  <Container role="rowgroup">
    <BodyText variant="body2" color={transparentize(0.5, colors.black[500])}>
      {rows} rows
    </BodyText>
    <PaginationContainer>
      <Pagination page={page} totalPages={totalPages} onChange={onPageChange} />
    </PaginationContainer>
    <ItemsPerPage
      value={itemsPerPage}
      onChange={(option) => onItemsPerPageChange(option)}
    />
  </Container>
);

export default TableFooter;
