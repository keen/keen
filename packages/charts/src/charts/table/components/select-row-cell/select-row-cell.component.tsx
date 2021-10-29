import React from 'react';
import { Cell, Row, UseRowSelectRowProps } from 'react-table';
import { Typography } from '@keen.io/ui-core';

import { SelectRow } from '../select-row';
import { CellContainer, CellContent } from '../body-cell';

import { CellValue } from '../../types';

interface EnhancedRow extends Row, UseRowSelectRowProps<Record<string, any>> {}

type Props = {
  /* Row instance enhanced with selection properties */
  row: EnhancedRow;
  /* Cell instance */
  cell: Cell;
  /* Typography settings */
  typography: Typography;
  /* Cell width */
  width?: number;
  /* Cell index */
  idx: number;
  /** Active cell indicator */
  isActive: boolean;
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value?: CellValue
  ) => void;
};

export const SelectRowCell = ({ width, cell, row, onCellClick }: Props) => {
  const { key } = cell.getCellProps();

  return (
    <CellContainer key={key} onClick={(e) => onCellClick(e)}>
      <CellContent textAlignment="left" width={width}>
        <SelectRow id={key.toString()} {...row.getToggleRowSelectedProps()} />
      </CellContent>
    </CellContainer>
  );
};
