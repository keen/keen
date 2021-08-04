import React from 'react';
import { HeaderGroup } from 'react-table';

import { Typography } from '../../../../types';
import { Head, HeadContent } from './header.styles';
import { SortIndicators } from '../sort-indicators';

type Props = {
  headerGroups: HeaderGroup<any>[];
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
              <HeadContent>
                {column.render('Header')}
                {column.isSorted && (
                  <SortIndicators
                    sortMode={column.isSortedDesc ? 'descending' : 'ascending'}
                  />
                )}
              </HeadContent>
            </th>
          ))}
        </tr>
      ))}
    </Head>
  );
};
