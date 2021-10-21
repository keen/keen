import React, { useMemo } from 'react';
import { rgba } from 'polished';
import { Row, TableBodyProps, Cell as CellType } from 'react-table';
import { Typography } from '@keen.io/ui-core';

import { CellValue } from '../../types';
import { BodyCell } from '../body-cell';
import { RowContainer } from './body.styles';

type Props = {
  page: Row[];
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  backgroundColor: string;
  typography: Typography;
  /** Edit mode indicator */
  isEditMode?: boolean;
  /** Active columns array */
  activeColumns?: number[];
  /** Cell element click event handler */
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

export const Body = ({
  page,
  getTableBodyProps,
  prepareRow,
  backgroundColor,
  typography,
  activeColumns = [],
  isEditMode = false,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
}: Props) => {
  const rgbaBackground = useMemo(() => rgba(backgroundColor, 0.3), [
    backgroundColor,
  ]);
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row: Row) => {
        prepareRow(row);
        return (
          <RowContainer
            key={row.getRowProps().key}
            mainColor={backgroundColor}
            enableHover={!isEditMode}
            {...(!isEditMode && {
              whileHover: { backgroundColor: rgbaBackground },
            })}
          >
            {row.cells.map((cell: CellType, i) => {
              return (
                <BodyCell
                  cell={cell}
                  key={i}
                  idx={i}
                  typography={typography}
                  isActive={activeColumns.includes(i)}
                  onCellClick={(e, columnName, value, idx) =>
                    onCellClick(e, columnName, value, idx)
                  }
                  onCellMouseEnter={onCellMouseEnter}
                  onCellMouseLeave={onCellMouseLeave}
                />
              );
            })}
          </RowContainer>
        );
      })}
    </tbody>
  );
};
