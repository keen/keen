import React from 'react';
import { Cell, Row, UseRowSelectHooks } from 'react-table';
import { Typography } from '@keen.io/ui-core';

import { SelectRow } from '../select-row';
import { CellContainer, CellContent } from '../body-cell';

import { CellValue } from '../../types';

type Props = {
  row: UseRowSelectHooks<Row<any>>;
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

export const SelectRowCell = ({
  idx,
  width,
  cell,
  row,
  isActive,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => {
  const { key } = cell.getCellProps();

  return (
    <CellContainer
      key={key}
      isActive={isActive}
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
      <CellContent textAlignment="left" width={width}>
        <SelectRow {...row.getToggleRowSelectedProps()} />
      </CellContent>
    </CellContainer>
  );
};
