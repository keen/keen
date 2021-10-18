import React from 'react';
import { HeaderGroup } from 'react-table';

import { Typography } from '../../../../types';
import { HeaderCell } from '../header-cell';
import { Head } from './header.styles';

type Props = {
  headerGroups: HeaderGroup[];
  typography: Typography;
  color: string;
};

export const Header = ({ headerGroups, typography, color }: Props) => {
  return (
    <Head typography={typography} backgroundColor={color}>
      {headerGroups.map((headerGroup: any, i) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
          {headerGroup.headers.map((column: any, i: number) => (
            <th
              {...column.getHeaderProps(column.getSortByToggleProps())}
              key={i}
            >
              <HeaderCell column={column} />
            </th>
          ))}
        </tr>
      ))}
    </Head>
  );
};
