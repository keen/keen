import React, { useMemo } from 'react';
import { rgba } from 'polished';
import { Row, TableBodyProps, Cell as CellType } from 'react-table';

import { Typography } from '../../../../types';
import { RowContainer } from './body.styles';
import { Cell } from '../cell';

type Props = {
  page: Row[];
  getTableBodyProps: () => TableBodyProps;
  prepareRow: (row: Row) => void;
  backgroundColor: string;
  typography: Typography;
};

export const Body = ({
  page,
  getTableBodyProps,
  prepareRow,
  backgroundColor,
  typography,
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
              return <Cell cell={cell} key={i} typography={typography} />;
            })}
          </RowContainer>
        );
      })}
    </tbody>
  );
};
