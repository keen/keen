import React, { useMemo } from 'react';
import { Cell as CellType } from 'react-table';
import { Typography, Text } from '@keen.io/ui-core';

import { CellValue } from '../../types';
import { StyledCell, Container } from './body-cell.styles';

type Props = {
  cell: CellType;
  typography: Typography;
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

export const BodyCell = ({
  cell,
  typography,
  idx,
  isActive,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => {
  const { value, formatterType } = cell.value;

  const textAlignment = useMemo(() => {
    const isNumeric =
      formatterType === 'number' ||
      (typeof value === 'number' && formatterType !== 'string');
    return isNumeric ? 'right' : 'left';
  }, [value, formatterType]);

  return (
    <StyledCell
      {...cell.getCellProps().key}
      onClick={(e) => onCellClick(e, cell.column.Header as string, value, idx)}
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
      <Container textAlignment={textAlignment} isActive={isActive}>
        <Text {...typography}>{`${value}`}</Text>
      </Container>
    </StyledCell>
  );
};
