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
  /** Cell index */
  index: number;
  /** Disable border indicator */
  disableBorder: boolean;
  /** Click event handler */
  onClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value: CellValue,
    idx: number
  ) => void;
  /** Mouse enter event handler */
  onMouseEnter?: (
    e: React.MouseEvent<HTMLTableCellElement>,
    idx: number
  ) => void;
  /** Mouse leave event handler */
  onMouseLeave?: (
    e: React.MouseEvent<HTMLTableCellElement>,
    idx: number
  ) => void;
};

const TableCell: FC<Props> = ({
  typography,
  value,
  index,
  disableBorder,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
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
    <StyledCell
      data-testid="table-cell"
      onClick={(e) => onClick(e, value, index)}
      disableBorder={disableBorder}
      onMouseEnter={
        onMouseEnter
          ? (e) => {
              e.persist();
              onMouseEnter(e, index);
            }
          : null
      }
      onMouseLeave={
        onMouseLeave
          ? (e) => {
              e.persist();
              onMouseLeave(e, index);
            }
          : null
      }
    >
      <Container textAlignment={textAlignment}>
        <Text {...typography}>{`${cellValue}`}</Text>
      </Container>
    </StyledCell>
  );
};

export default TableCell;
