import React, { FC, useMemo } from 'react';

import { Container, StyledCell } from './table-cell.styles';

import { Text } from '../../typography';

import { CellValue, CellTextAlignment } from './types';
import { Typography } from '../../types';

const VALUE_DELIMETER = ', ';

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
  const { textAlignment, cellValue } = useMemo<{
    textAlignment: CellTextAlignment;
    cellValue: string | number | boolean | Date;
  }>(() => {
    const valueType = typeof value;
    let cellValue;

    if (Array.isArray(value)) {
      cellValue = value.join(VALUE_DELIMETER);
    } else {
      cellValue = value;
    }

    return {
      cellValue,
      textAlignment: valueType === 'number' ? 'right' : 'left',
    };
  }, [value]);

  return (
    <StyledCell data-testid="table-cell" onClick={e => onClick(e, value)}>
      <Container textAlignment={textAlignment}>
        <Text {...typography}>{cellValue}</Text>
      </Container>
    </StyledCell>
  );
};

export default TableCell;
