import React from 'react';
import { Cell as CellType, Row, UseRowSelectRowProps } from 'react-table';
import { Typography, Checkbox } from '@keen.io/ui-core';

import { CellContainer, CellContent } from '../../body-cell';

import { CellValue } from '../../../types';

interface EnhancedRow extends Row, UseRowSelectRowProps<Record<string, any>> {}

type Props = {
  /* Row instance enhanced with selection properties */
  row: EnhancedRow;
  /* Cell instance */
  cell: CellType;
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

export const Cell = ({ width, cell, row, onCellClick }: Props) => {
  const { key } = cell.getCellProps();
  const { checked } = row.getToggleRowSelectedProps();

  return (
    <CellContainer key={key} onClick={(e) => onCellClick(e)}>
      <CellContent textAlignment="left" width={width}>
        <Checkbox
          id={key.toString()}
          display="inline-flex"
          type="secondary"
          checked={checked}
        />
      </CellContent>
    </CellContainer>
  );
};
