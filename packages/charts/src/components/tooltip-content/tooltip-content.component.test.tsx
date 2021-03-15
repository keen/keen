import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import TooltipContent from './tooltip-content.component';

import { theme } from '../../theme';
import { ChartContext } from '../../contexts';

const render = (overProps: any = {}) => {
  const props = {
    items: [{ color: 'red', data: 'value' }],
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={{ xScaleSettings: {}, theme }}>
      <TooltipContent {...props} />
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('renders basic content', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.items[0].data)).toBeInTheDocument();
});

test('renders label for tooltip', () => {
  const label = 'tooltipLabel';
  const {
    wrapper: { getByText },
  } = render({ label });

  expect(getByText(label)).toBeInTheDocument();
});

test('renders items list within the component', () => {
  const items = [
    { color: 'red', data: 'value1' },
    { color: 'red', data: 'value2' },
    { color: 'red', data: 'value3' },
  ];

  const {
    wrapper: { getByText },
  } = render({ items });

  items.forEach((item) => expect(getByText(item.data)).toBeInTheDocument());
});

test('renders total value for the list', () => {
  const items = [
    { color: 'red', data: '10' },
    { color: 'red', data: '20' },
    { color: 'red', data: '30' },
  ];
  const totalValue = '60';

  const {
    wrapper: { getByText },
  } = render({ items, totalValue });
  expect(getByText(totalValue)).toBeInTheDocument();
});

test('renders total value with percentage for list', () => {
  const items = [
    { color: 'red', data: '10' },
    { color: 'red', data: '20' },
    { color: 'red', data: '30' },
  ];
  const totalValue = '60';
  const percentValue = 30;

  const {
    wrapper: { getByText },
  } = render({ items, totalValue, percentValue });

  expect(getByText(`(${totalValue})`)).toBeInTheDocument();
  expect(getByText('30.0%')).toBeInTheDocument();
});
