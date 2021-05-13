import React, { FC, useMemo } from 'react';
import { rgba } from 'polished';

import { Container } from './table-row.styles';
import TableCell from './table-cell.component';

import { CellValue } from './types';
import { Typography } from '../../types';

type Props = {
  /** Row data */
  data?: Record<string, any>;
  /** Background color */
  backgroundColor: string;
  /** Row typography properties */
  typography: Typography;
  /** Table layout during resize */
  isColumnDragged: boolean;
  /** Cell element click event handler */
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
    value: CellValue
  ) => void;
};

const TableRow: FC<Props> = ({
  data,
  typography,
  isColumnDragged,
  onCellClick,
  backgroundColor,
}) => {
  const rgbaBackground = useMemo(() => rgba(backgroundColor, 0.3), [
    backgroundColor,
  ]);

  return (
    <Container
      mainColor={backgroundColor}
      isColumnDragged={isColumnDragged}
      whileHover={
        isColumnDragged
          ? {}
          : {
              backgroundColor: rgbaBackground,
            }
      }
    >
      {Object.keys(data).map((key: string) => (
        <TableCell
          key={key}
          onClick={onCellClick}
          typography={typography}
          value={data[key]}
        />
      ))}
    </Container>
  );
};

export default TableRow;
