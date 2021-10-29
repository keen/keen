import React, { useMemo } from 'react';
import { Cell } from 'react-table';
import { Typography, Text } from '@keen.io/ui-core';

import { CellContainer, CellContent } from '../body-cell';

import { CellValue } from '../../types';

type Props = {
  /* Cell instance */
  cell: Cell;
  /* Typography settings */
  typography: Typography;
  /* Cell width */
  width?: number;
  /** Active cell indicator */
  isActive: boolean;
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value?: CellValue
  ) => void;
  /** Cell element mouse enter event hander */
  onCellMouseEnter?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
  /** Cell element mouse leave event hander */
  onCellMouseLeave?: (e: React.MouseEvent<HTMLTableCellElement>) => void;
};

export const ValueCell = ({
  cell,
  typography,
  width,
  isActive,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => {
  const { value, formatterType } = cell.value;
  const { key } = cell.getCellProps();
  const textAlignment = useMemo(() => {
    const isNumeric =
      formatterType === 'number' ||
      (typeof value === 'number' && formatterType !== 'string');
    return isNumeric ? 'right' : 'left';
  }, [value, formatterType]);

  return (
    <CellContainer
      key={key}
      isActive={isActive}
      onClick={(e) => onCellClick(e, value)}
      onMouseEnter={
        onCellMouseEnter
          ? (e) => {
              e.persist();
              onCellMouseEnter(e);
            }
          : null
      }
      onMouseLeave={
        onCellMouseLeave
          ? (e) => {
              e.persist();
              onCellMouseLeave(e);
            }
          : null
      }
    >
      <CellContent textAlignment={textAlignment} width={width}>
        <Text {...typography}>{`${value}`}</Text>
      </CellContent>
    </CellContainer>
  );
};
