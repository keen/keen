import React, { FC, useMemo } from 'react';

import { BodyText } from '@keen.io/typography';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { createPagination } from './utils';

import {
  Container,
  PageNumber,
  IconContainer,
  PaginationText,
} from './pagination.styles';
import { KEYBOARD_KEYS } from '../../constants';

type Props = {
  /** Current page indicator */
  page?: number;
  /** Number of total pages */
  totalPages: number;
  /** Change event handler */
  onChange: (page: number) => void;
};

const Pagination: FC<Props> = ({ page = 1, totalPages, onChange }) => {
  const items = useMemo(
    () => createPagination({ currentPage: page, totalPages }),
    [page, totalPages]
  );

  return (
    <Container>
      <IconContainer
        onClick={() => (page === 1 ? null : onChange(page - 1))}
        onKeyDown={(e) => {
          if (page !== 1 && e.keyCode === KEYBOARD_KEYS.ENTER) {
            onChange(page - 1);
          }
        }}
        role="button"
        tabIndex={0}
        data-testid="prev-btn"
        isDisabled={page === 1}
      >
        <Icon
          width={11}
          height={11}
          fill={colors.blue[500]}
          type="caret-left"
          opacity={page === 1 ? 0.5 : 1}
        />
      </IconContainer>
      {items.map((item, idx) => (
        <React.Fragment key={`page-${idx}-${item}`}>
          {typeof item === 'number' ? (
            <PageNumber
              isActive={item === page}
              onClick={() => (item === page ? null : onChange(item))}
              onKeyDown={(e) => {
                if (item !== page && e.keyCode === KEYBOARD_KEYS.ENTER)
                  onChange(item);
              }}
              role="button"
              tabIndex={0}
            >
              {item}
            </PageNumber>
          ) : (
            <PaginationText>
              <BodyText variant="body2" color={colors.blue[500]}>
                {item}
              </BodyText>
            </PaginationText>
          )}
        </React.Fragment>
      ))}
      <IconContainer
        onClick={() => (page === totalPages ? null : onChange(page + 1))}
        onKeyDown={(e) => {
          if (page !== totalPages && e.keyCode === KEYBOARD_KEYS.ENTER) {
            onChange(page + 1);
          }
        }}
        role="button"
        tabIndex={0}
        data-testid="next-btn"
        isDisabled={page === totalPages}
      >
        <Icon
          width={11}
          height={11}
          fill={colors.blue[500]}
          type="caret-right"
          opacity={page === totalPages ? 0.5 : 1}
        />
      </IconContainer>
    </Container>
  );
};

export default Pagination;
