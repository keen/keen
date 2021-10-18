import React, { useMemo } from 'react';
import { rgba } from 'polished';
import { Row, TableBodyProps, Cell as CellType } from 'react-table';

import { Typography } from '../../../../types';
import { CellValue } from '../../types';
import { BodyCell } from '../body-cell';
import { RowContainer } from './body.styles';

type Props = {
  page: Row[];
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  backgroundColor: string;
  typography: Typography;
  /** Cell element click event handler */
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    columnName: string,
    value: CellValue,
    idx: number
  ) => void;
};

export const Body = ({
  page,
  getTableBodyProps,
  prepareRow,
  backgroundColor,
  typography,
  onCellClick,
}: Props) => {
  const rgbaBackground = useMemo(() => rgba(backgroundColor, 0.3), [
    backgroundColor,
  ]);
  return (
    <tbody {...getTableBodyProps()}>
      {page.map((row: Row, i) => {
        prepareRow(row);

        return (
          <RowContainer
            {...row.getRowProps()}
            mainColor={backgroundColor}
            whileHover={{ backgroundColor: rgbaBackground }}
            key={i}
          >
            {row.cells.map((cell: CellType, i) => {
              return (
                <BodyCell
                  cell={cell}
                  key={i}
                  idx={i}
                  typography={typography}
                  onCellClick={(e, columnName, value, idx) =>
                    onCellClick(e, columnName, value, idx)
                  }
                />
              );
            })}
          </RowContainer>
        );
      })}
    </tbody>
  );
};
