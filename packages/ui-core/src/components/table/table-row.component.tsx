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
  /** Active column index */
  activeColumn?: number;
  /** Cell element click event handler */
  onCellClick: (
    e: React.MouseEvent<HTMLTableCellElement>,
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

const TableRow: FC<Props> = ({
  data,
  typography,
  isColumnDragged,
  backgroundColor,
  activeColumn,
  onCellClick,
  onCellMouseEnter,
  onCellMouseLeave,
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
      {Object.keys(data).map((key: string, idx: number) => (
        <TableCell
          key={key}
          index={idx}
          onClick={onCellClick}
          onMouseEnter={onCellMouseEnter}
          onMouseLeave={onCellMouseLeave}
          disableBorder={activeColumn !== undefined}
          typography={typography}
          value={data[key]}
        />
      ))}
    </Container>
  );
};

export default TableRow;
