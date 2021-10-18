import React, { FC, useCallback, useState } from 'react';
import Measure from 'react-measure';
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
}) => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [isMobileView, setMobileView] = useState(false);

  const textEllipsisRef = useCallback(
    (node) => {
      if (node !== null) {
        const width = node.offsetWidth;
        const scrollWidth = node.scrollWidth;

        setMobileView(scrollWidth > width);
      }
    },
    [containerWidth]
  );

  return (
    <Measure
      bounds
      onResize={({ bounds: { width } }) => {
        setContainerWidth(width);
      }}
    >
      {({ measureRef }) => (
        <Container role="rowgroup" isMobileView={isMobileView} ref={measureRef}>
          <BodyText
            variant="body2"
            color={transparentize(0.5, colors.black[500])}
            enableTextEllipsis
            ref={textEllipsisRef}
          >
            {rows} rows
          </BodyText>
          <PaginationContainer isMobileView={isMobileView}>
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={onPageChange}
            />
          </PaginationContainer>
          <ItemsPerPage
            value={itemsPerPage}
            onChange={(option) => onItemsPerPageChange(option)}
          />
        </Container>
      )}
    </Measure>
  );
};

export default TableFooter;
