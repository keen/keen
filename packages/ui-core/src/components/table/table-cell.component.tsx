import React, { FC, useMemo } from 'react';

import { Container, StyledCell } from './table-cell.styles';

import { Text } from '../../typography';

import { CellValue } from './types';
import { Typography } from '../../types';

type Props = {
  /** Cell typography */
  typography: Typography;
  /** Cell value */
  value: CellValue;
  /** Click event handler */
  onClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value: CellValue
  ) => void;
};

const TableCell: FC<Props> = ({ typography, onClick, value }) => {
  const textAlignment = useMemo(() => {
    const valueType = typeof value;
    return valueType === 'number' ? 'right' : 'left';
  }, [value]);

  return (
    <StyledCell data-testid="table-cell" onClick={e => onClick(e, value)}>
      <Container textAlignment={textAlignment}>
        <Text {...typography}>{value}</Text>
      </Container>
    </StyledCell>
  );
};

export default TableCell;
