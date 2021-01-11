import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import BarTooltip from './bar-tooltip-content.component';

import { chartData as data } from './bar-chart.fixtures';
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
  const formatValue = (value) => `$${value}`;
  const props = {
    data,
    keys,
    disabledKeys: [],
    selectors,
    groupMode: 'normal',
    stackMode: 'grouped',
    isList: false,
    formatValue,
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={{ theme }}>
      <BarTooltip {...props} />
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
    stackMode: 'percent',
    groupMode: 'stacked',
    isList: true,
  });
  const [firstSeries] = data;
  const { users, licenses } = firstSeries;
  expect(getByText(`${formatValue(users)} (30.00%)`)).toBeInTheDocument();
  expect(getByText(`${formatValue(licenses)} (70.00%)`)).toBeInTheDocument();
});
