import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { BarChartWidget } from '@keen.io/widgets';

import { getWidget } from '../selectors';

import { AppState } from '../types';

type Props = {
  dashboardId: string;
  id: string;
};

export const chartData = [
  {
    name: 'January',
    users: 3,
    licenses: 52,
    shops: 12,
    books: 34,
  },
  {
    name: 'February',
    users: 6,
    licenses: 54,
    shops: 34,
    books: 89,
  },
  {
    name: 'March',
    users: 20,
    licenses: 15,
    shops: 23,
    books: 41,
  },
  {
    name: 'April',
    users: 19,
    licenses: 82,
    shops: 15,
    books: 23,
  },
];

const WidgetContainer: FC<Props> = ({ id }) => {
  const widget = useSelector((state: AppState) => getWidget(state, id));
  console.log(widget, 'sa');
  return (
    <>
      <BarChartWidget
        labelSelector="name"
        data={chartData}
        keys={['users', 'shops', 'books', 'licenses']}
      />
    </>
  );
};

export default WidgetContainer;
