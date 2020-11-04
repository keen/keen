import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { ChartContext } from '../../contexts';

import Tooltip from './tooltip.component';

const render = (overProps: any = {}) => {
  const data = [
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
      users: -20,
      licenses: 15,
      shops: 23,
      books: 41,
    },
    {
      name: '2020-04-01T00:00:00.000Z',
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
  const selectors = [{ selector: [1, 'books'], color: '#CB5623' }];
  const formatTooltip = value => `$${value}`;

  const props = {
    data,
    selectors,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider
      value={{ theme: { tooltip: { labels: { typography: {} } } } }}
    >
      <Tooltip {...props} />
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', () => {
  const {
    wrapper: { getByText },
  } = render();
  const tooltipContent = getByText(/\$89/);

  expect(tooltipContent).toBeInTheDocument();
});
