import React, { useMemo } from 'react';
import { Cell as CellType } from 'react-table';

import { StyledCell, Container } from './cell.styles';
import { Text } from '../../../../typography';
import { CellTextAlignment } from '../../../table'; // todo
import { Typography } from '../../../../types';

const VALUE_DELIMITER = ', ';

type Props = {
  cell: CellType;
  typography: Typography;
};

export const Cell = ({ cell, typography }: Props) => {
  const value = cell.value;

  const { textAlignment, cellValue } = useMemo<{
    textAlignment: CellTextAlignment;
    cellValue: string | number | boolean | Date;
  }>(() => {
    const valueType = typeof value;
    let cellValue;

    if (Array.isArray(value)) {
      cellValue = value.join(VALUE_DELIMITER);
    } else {
      cellValue = value;
    }

    return {
      cellValue,
      textAlignment: valueType === 'number' ? 'right' : 'left',
    };
  }, [value]);

  return (
    <StyledCell {...cell.getCellProps()}>
      <Container textAlignment={textAlignment}>
        <Text {...typography}>{`${cellValue}`}</Text>
      </Container>
    </StyledCell>
  );
};
