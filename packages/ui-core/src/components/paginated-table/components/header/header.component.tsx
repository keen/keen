import React from 'react';
import { HeaderGroup } from 'react-table';

import SortIndicators from '../../../table/sort-indicators.component'; // todo
import { Typography } from '../../../../types';
import { Head, HeadContent } from './header.styles';

type Props = {
  headerGroups: HeaderGroup[];
  typography: Typography;
  color: string;
};

export const Header = ({ headerGroups, typography, color }: Props) => {
  return (
    <Head typography={typography} backgroundColor={color}>
      {headerGroups.map((headerGroup: HeaderGroup, i) => (
        <tr {...headerGroup.getHeaderGroupProps()} key={i}>
          {headerGroup.headers.map((column, i) => (
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
