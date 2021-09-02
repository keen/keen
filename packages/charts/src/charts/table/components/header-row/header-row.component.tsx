import React from 'react';
import {
  TableHeader,
  SortMode,
  SortByType,
  Typography,
} from '@keen.io/ui-core';

import { HeaderCell } from '../../types';

import {
  Container,
  StickyCell,
  DisableInteractions,
} from './header-row.styles';

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
  /** Edit mode click handler */
  onEditModeClick?: (
    e: React.MouseEvent<HTMLTableDataCellElement>,
    idx: number
  ) => void;
  /** Column sort event handler */
  onSort?: (sortMeta: { propertyName: string; sortMode: SortMode }) => void;
  /** Cell element mouse enter event hander */
  onCellMouseEnter?: (
    e: React.MouseEvent<HTMLTableCellElement>,
    idx: number
  ) => void;
  /** Cell element mouse leave event hander */
  onCellMouseLeave?: (
    e: React.MouseEvent<HTMLTableCellElement>,
    idx: number
  ) => void;
};

export const HeaderRow = ({
  data,
  color,
  sortOptions,
  isColumnDragged,
  typography,
  activeColumns = [],
  onEditModeClick,
  onSort,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => (
  <thead>
    <Container typography={typography} data-testid="header-row-container">
      {data.map(({ key, value, align }: HeaderCell, idx: number) => (
        <StickyCell
          key={key}
          backgroundColor={color}
          isActive={activeColumns.includes(idx)}
          onClick={(e) => onEditModeClick && onEditModeClick(e, idx)}
          onMouseEnter={(e) => onCellMouseEnter && onCellMouseEnter(e, idx)}
          onMouseLeave={(e) => onCellMouseLeave && onCellMouseLeave(e, idx)}
        >
          <DisableInteractions disableInteraction={!!onEditModeClick}>
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
          </DisableInteractions>
        </StickyCell>
      ))}
    </Container>
  </thead>
);

export default HeaderRow;
