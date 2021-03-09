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
    scaleSettings: {},
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
