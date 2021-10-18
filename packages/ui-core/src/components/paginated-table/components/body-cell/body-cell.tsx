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
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    columnName: string,
    value: CellValue,
    idx: number
  ) => void;
};

const isFormattedValue = (el: any): el is FormattedValue =>
  typeof el === 'object' && el !== null && 'value' in el;

export const BodyCell = ({ cell, typography, onCellClick, idx }: Props) => {
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
      {...cell.getCellProps()}
      onClick={(e) => onCellClick(e, 'test', value, idx)}
    >
      <Container textAlignment={textAlignment}>
        <Text {...typography}>{`${value}`}</Text>
      </Container>
    </StyledCell>
  );
};
