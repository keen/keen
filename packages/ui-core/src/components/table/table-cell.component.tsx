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
  /** Cell text alignment */
  textAlignment?: CellTextAlignment;
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
  textAlignment = 'left',
  index,
  disableBorder,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { cellValue } = useMemo<{
    cellValue: string | number | boolean | Date;
  }>(() => {
    let cellValue;

    if (Array.isArray(value)) {
      cellValue = value.join(VALUE_DELIMETER);
    } else {
      cellValue = value;
    }

    return {
      cellValue,
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
