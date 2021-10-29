import React, { useMemo } from 'react';
import { rgba } from 'polished';
import { Row, TableBodyProps } from 'react-table';
import { Typography } from '@keen.io/ui-core';

import { CellValue, CellClickMetadata } from '../../types';

import { RowContainer } from './body.styles';

type Props = {
  page: Row[];
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  backgroundColor: string;
  typography: Typography;
  columnsWidth: number[];
  /** Edit mode indicator */
  isEditMode?: boolean;
  /** Active columns array */
  activeColumns?: number[];
  /** Cell element click event handler */
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    meta: CellClickMetadata
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
  columnsWidth,
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
            {row.cells.map((cell: any, i) => {
              const {
                column: { id: columnId, type: columnType },
                row: { id: rowId },
              } = cell;

              return cell.render('Cell', {
                width: columnsWidth[i] ? columnsWidth[i] : null,
                typography,
                isActive: activeColumns.includes(i),
                onCellClick: (
                  e: React.MouseEvent<HTMLTableCellElement>,
                  value: CellValue
                ) =>
                  onCellClick(e, {
                    columnName: columnId,
                    columnType,
                    rowId,
                    value,
                    idx: i,
                  }),
                onCellMouseEnter: (e: React.MouseEvent<HTMLTableCellElement>) =>
                  onCellMouseEnter && onCellMouseEnter(e, i),
                onCellMouseLeave: (e: React.MouseEvent<HTMLTableCellElement>) =>
                  onCellMouseLeave && onCellMouseLeave(e, i),
              });
            })}
          </RowContainer>
        );
      })}
    </tbody>
  );
};
