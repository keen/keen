import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import DistributedChartTooltip from './distributed-chart-tooltip.component';

import { theme } from '../../theme';
import { ChartContext } from '../../contexts';

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

  const formatValue = jest.fn().mockImplementation((value) => `$${value}`);

  const props = {
    data,
    keys,
    disabledKeys: [],
    selectors,
    isPercentage: false,
    isTimePrecise: false,
    tooltipSettings: {
      formatValue,
    },
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

test('applies function formatter on values', () => {
  const {
    wrapper: { getByText },
    props: { tooltipSettings },
  } = render();

  expect(tooltipSettings.formatValue).toHaveBeenCalled();
  expect(getByText('$3')).toBeInTheDocument();
});

test('formats toolip list values and renders percentages', () => {
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
    props: {
      tooltipSettings: { formatValue },
    },
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

test('applies time formatter for labels', () => {
  const formatTime = jest.fn().mockImplementation(() => '@formatted-date');
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
  const labelSelector = 'keen.key';

  const {
    wrapper: { getByText },
  } = render({
    data,
    keys,
    selectors,
    labelSelector,
    isTimePrecise: true,
    tooltipSettings: { formatTime },
  });

  expect(getByText('@formatted-date')).toBeInTheDocument();
});
