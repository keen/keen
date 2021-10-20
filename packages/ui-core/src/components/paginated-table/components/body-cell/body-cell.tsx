import React, { useEffect, useState } from 'react';
import { Cell as CellType } from 'react-table';

import { Text } from '../../../../typography';
import { Typography } from '../../../../types';
import { CellTextAlignment, CellValue, FormattedValue } from '../../types';
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

const isFormattedValue = (el: any): el is FormattedValue =>
  typeof el === 'object' && el !== null && 'value' in el;

export const BodyCell = ({
  cell,
  typography,
  idx,
  isActive,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => {
  const [textAlignment, setTextAlignment] = useState<CellTextAlignment>('left');
  const [value, setValue] = useState<CellValue>('');

  useEffect(() => {
    if (isFormattedValue(cell.value)) {
      const { value, formatterType } = cell.value;
      const alignment = formatterType === 'number' ? 'right' : 'left';
      setTextAlignment(alignment);
      setValue(value);
    } else {
      setValue(cell.value);
    }
    if (typeof cell.value === 'number') {
      setTextAlignment('right');
    }
  }, [cell]);

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
