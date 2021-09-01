import React from 'react';
import {
  TableHeader,
  SortMode,
  SortByType,
  Typography,
} from '@keen.io/ui-core';

import { HeaderCell } from '../../types';

import { Container, StickyCell } from './header-row.styles';

type Props = {
  /* Header data */
  data: HeaderCell[];
  /** Header background color */
  color: string;
  /** Header labels typography */
  typography: Typography;
  /** Sort settings */
  sortOptions?: SortByType;
  /** Column drag indicator */
  isColumnDragged: boolean;
  /** Active columns array */
  activeColumns?: number[];
  /** Column sort event handler */
  onSort?: (sortMeta: { propertyName: string; sortMode: SortMode }) => void;
};

export const HeaderRow = ({
  data,
  color,
  sortOptions,
  isColumnDragged,
  typography,
  activeColumns = [],
  onSort,
}: Props) => (
  <thead>
    <Container typography={typography} data-testid="header-row-container">
      {data.map(({ key, value, align }: HeaderCell, idx: number) => (
        <StickyCell
          key={key}
          backgroundColor={color}
          isActive={activeColumns.includes(idx)}
        >
          <TableHeader
            propertyName={key}
            backgroundColor={color}
            sortOptions={sortOptions}
            isColumnDragged={isColumnDragged}
            textAlignment={align}
            onSort={onSort}
          >
            {value}
          </TableHeader>
        </StickyCell>
      ))}
    </Container>
  </thead>
);

export default HeaderRow;
