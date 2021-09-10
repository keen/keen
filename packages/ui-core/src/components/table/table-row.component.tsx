import React, { FC, useMemo } from 'react';
import { rgba } from 'polished';
import { ValueFormatter } from '@keen.io/charts';
import { extractFormatterType } from '@keen.io/charts-utils';

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
  /** Active column index */
  activeColumn?: number;
  /** Edit mode indicator */
  enableEditMode?: boolean;
  /** Object of formatter functions to format values separately */
  formatValue?: ValueFormatter;
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

const TableRow: FC<Props> = ({
  data,
  typography,
  backgroundColor,
  activeColumn,
  enableEditMode,
  formatValue = {},
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
      disableHover={enableEditMode}
      whileHover={
        enableEditMode
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
          onClick={(e, value, idx) => onCellClick(e, key, value, idx)}
          onMouseEnter={onCellMouseEnter}
          onMouseLeave={onCellMouseLeave}
          disableBorder={activeColumn !== undefined}
          typography={typography}
          value={data[key]}
          formatterType={
            typeof formatValue[key] === 'string'
              ? extractFormatterType(formatValue[key] as string)
              : undefined
          }
        />
      ))}
    </Container>
  );
};

export default TableRow;
