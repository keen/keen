import React from 'react';
import { Cell as CellType, Row, UseRowSelectRowProps } from 'react-table';
import { Checkbox } from '@keen.io/ui-core';

import { CellContainer, CellContent } from '../../body-cell';

import { CellValue } from '../../../types';

interface EnhancedRow extends Row, UseRowSelectRowProps<Record<string, any>> {}

type Props = {
  /* Row instance enhanced with selection properties */
  row: EnhancedRow;
  /* Cell instance */
  cell: CellType;
  /* Cell width */
  width?: number;
  /** Click event handler */
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value?: CellValue
  ) => void;
  /** Table edit mode indicator */
  editMode: boolean;
};

export const Cell = ({ width, cell, row, onCellClick, editMode }: Props) => {
  const { key } = cell.getCellProps();
  const { checked } = row.getToggleRowSelectedProps();

  return (
    <CellContainer
      isDisabled={editMode}
      data-testid="table-selection-column-cell"
      key={key}
      onClick={(e) => onCellClick(e)}
    >
      <CellContent textAlignment="center" width={width}>
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
