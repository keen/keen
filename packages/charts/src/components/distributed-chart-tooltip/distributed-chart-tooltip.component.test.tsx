import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { theme } from '../../theme';
import { ChartContext } from '../../contexts';
import DistributedChartTooltip from './distributed-chart-tooltip.component';

const render = (overProps: any = {}) => {
  const keys = ['users', 'licenses'];
  const selectors = [
    {
      color: '#85B4C3',
      selector: [0, 'users'],
    },
  ];

  const data = [
    { name: 'Windows', users: 3, licenses: 52, shops: 12 },
    { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
    { name: 'Linux', users: 20, licenses: -15, shops: 23 },
    { name: 'Android', users: 63, licenses: -15, shops: -30 },
  ];

  const formatValue = (value) => `$${value}`;

  const props = {
    data,
    keys,
    disabledKeys: [],
    selectors,
    isPercentage: false,
    formatValue,
    scaleSettings: {},
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={{ theme }}>
      <DistributedChartTooltip {...props} />
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
    props: { data, formatValue },
  } = render();
  const [firstSeries] = data;
  const { users } = firstSeries;
  const formattedValue = formatValue(users);
  expect(getByText(formattedValue)).toBeInTheDocument();
});

test('formats toolip list values', () => {
  const data = [{ name: 'Windows', users: 30, licenses: 70 }];
  const selectors = [
    {
      selector: [0, 'users'],
      color: '#85B4C3',
    },
    { selector: [0, 'licenses'], color: '#CB5623' },
  ];
  const {
    wrapper: { getByText },
    props: { formatValue },
  } = render({
    data,
    selectors,
    isPercentage: true,
  });
  const [firstSeries] = data;
  const { users, licenses } = firstSeries;
  expect(getByText(`(${formatValue(users)})`)).toBeInTheDocument();
  expect(getByText('30.0%')).toBeInTheDocument();
  expect(getByText(`(${formatValue(licenses)})`)).toBeInTheDocument();
  expect(getByText('70.0%')).toBeInTheDocument();
});

test('renders tooltip label when time precision is provided for axis', () => {
  const data = [
    {
      'keen.key': '2019-05-01T00:00:00.000Z',
      'Edwidge Danticat': 121,
      'George R. R. Martin': 64,
      'J.K. Rowling': 82,
      'Stephen King': 6,
    },
  ];
  const keys = [
    'Edwidge Danticat',
    'George R. R. Martin',
    'J.K. Rowling',
    'Stephen King',
  ];
  const selectors = [{ selector: [0, 'Edwidge Danticat'], color: '#85B4C3' }];
  const scaleSettings = { type: 'band', precision: 'month' };
  const labelSelector = 'keen.key';

  const [firstSelector] = selectors;
  const [index] = firstSelector.selector;
  const tooltipLabel = data[index][labelSelector];
  const {
    wrapper: { getByText },
  } = render({ data, keys, selectors, labelSelector, scaleSettings });

  expect(getByText(tooltipLabel)).toBeInTheDocument();
});