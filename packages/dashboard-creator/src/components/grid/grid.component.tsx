import React from 'react';
import { WidthProvider, Responsive } from 'react-grid-layout';

import { LineChartWidget } from '@keen.io/widgets';

export const chartData = [
  {
    name: '2020-01-01T00:00:00.000Z',
    users: 3,
    licenses: 52,
    shops: 12,
    books: 34,
  },
  {
    name: '2020-02-01T00:00:00.000Z',
    users: 6,
    licenses: 54,
    shops: 34,
    books: 89,
  },
  {
    name: '2020-03-01T00:00:00.000Z',
    users: 20,
    licenses: 15,
    shops: 23,
    books: 41,
  },
  {
    name: '2020-04-15T00:00:00.000Z',
    users: 19,
    licenses: 82,
    shops: 15,
    books: 23,
  },
  {
    name: '2020-05-01T00:00:00.000Z',
    users: 13,
    licenses: 26,
    shops: 34,
    books: 26,
  },
  {
    name: '2020-06-01T00:00:00.000Z',
    users: 4,
    licenses: 34,
    shops: 25,
    books: 74,
  },
];

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const state = {
  items: [0, 1, 2, 3, 4].map(function(i) {
    return {
      i: i.toString(),
      x: i * 2,
      y: 0,
      w: 2,
      h: 2,
      static: false,
    };
  }),
};

const Grid = () => (
  <ResponsiveReactGridLayout isDraggable={true} isResizable={true}>
    {state.items.map((el, i) => (
      <div key={i} data-grid={el} style={{ background: 'red' }}>
        <LineChartWidget
          data={chartData}
          keys={['users', 'licenses']}
          labelSelector="name"
        />
      </div>
    ))}
  </ResponsiveReactGridLayout>
);
export default Grid;
