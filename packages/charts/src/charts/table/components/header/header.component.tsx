import React from 'react';
import { HeaderGroup } from 'react-table';
import { Typography } from '@keen.io/ui-core';

import { HeaderCell } from '../header-cell';
import { Head, TableHeader } from './header.styles';

type Props = {
  headerGroups: HeaderGroup[];
  typography: Typography;
  color: string;
  /** Active columns array */
  activeColumns?: number[];
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
  /** Edit mode click handler */
  onEditModeClick?: (
    e: React.MouseEvent<HTMLTableDataCellElement>,
    columnName: string,
    idx: number
  ) => void;
};

export const Header = ({
  headerGroups,
  typography,
  color,
  activeColumns = [],
  onCellMouseEnter,
  onCellMouseLeave,
  onEditModeClick,
}: Props) => {
  return (
    <Head typography={typography} backgroundColor={color}>
      {headerGroups.map((headerGroup: HeaderGroup) => (
        <tr key={headerGroup.getHeaderGroupProps().key}>
          {headerGroup.headers.map((column: any, idx: number) => {
            const { title, key, onClick } = column.getHeaderProps(
              column.getSortByToggleProps()
            );
            return (
              <TableHeader
                key={key}
                title={title}
                isActive={activeColumns.includes(idx)}
                onClick={(e) =>
                  onEditModeClick ? onEditModeClick(e, key, idx) : onClick(e)
                }
                onMouseEnter={(e) =>
                  onCellMouseEnter && onCellMouseEnter(e, idx)
                }
                onMouseLeave={(e) =>
                  onCellMouseLeave && onCellMouseLeave(e, idx)
                }
              >
                <HeaderCell column={column} />
              </TableHeader>
            );
          })}
        </tr>
      ))}
    </Head>
  );
};
