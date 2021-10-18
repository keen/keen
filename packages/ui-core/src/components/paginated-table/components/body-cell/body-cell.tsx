import React, { useMemo } from 'react';
import { Cell as CellType } from 'react-table';

import { Text } from '../../../../typography';
import { Typography } from '../../../../types';
import { CellValue } from '../../types';
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

export const BodyCell = ({ cell, typography, onCellClick, idx }: Props) => {
  const { value, formatterType } = cell.value;

  const textAlignment = useMemo(() => {
    return formatterType === 'number' || typeof value === 'number'
      ? 'right'
      : 'left';
  }, [value, formatterType]);

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
