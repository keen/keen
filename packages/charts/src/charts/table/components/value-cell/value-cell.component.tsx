import React, { useMemo } from 'react';
import { Cell } from 'react-table';
import { Typography, Text } from '@keen.io/ui-core';

import { CellContainer, CellContent } from '../body-cell';

import { CellValue } from '../../types';

type Props = {
  cell: Cell;
  typography: Typography;
  width?: number;
  idx: number;
  /** Active cell indicator */
  isActive: boolean;
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    columnName: string,
    value: CellValue,
    idx: number
  ) => void;
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

export const ValueCell = ({
  cell,
  typography,
  idx,
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
      onClick={(e) => onCellClick(e, cell.column.id, value, idx)}
      onMouseEnter={
        onCellMouseEnter
          ? (e) => {
              e.persist();
              onCellMouseEnter(e, idx);
            }
          : null
      }
      onMouseLeave={
        onCellMouseLeave
          ? (e) => {
              e.persist();
              onCellMouseLeave(e, idx);
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
