import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import TooltipContent from './tooltip-content.component';
import { Typography } from '@keen.io/ui-core';

const render = (
  overProps: Partial<ComponentProps<typeof TooltipContent>> = {}
) => {
  const data = [
    { channel: 'Facebook', cost: 310, conversion: 352, users: 500 },
  ];
  const labelSelector = 'channel';
  const selectors = [{ color: '#487650', selector: [0] }];
  const valueKey = 'cost';
  const xDomainKey = 'users';
  const yDomainKey = 'conversion';
  const formatValue = {
    xKey: (value) => `${value} X`,
    yKey: (value) => `${value} Y`,
    valueKey: (value) => `${value} value`,
  };
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 12,
    fontColor: 'black',
  };

  const props = {
    data,
    labelSelector,
    selectors,
    valueKey,
    xDomainKey,
    yDomainKey,
    formatValue,
    typography,
    ...overProps,
  };

  const wrapper = rtlRender(<TooltipContent {...props} />);

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
  const { cost, conversion, users } = firstSeries;

  expect(getByText(formatValue.xKey(users))).toBeInTheDocument();
  expect(getByText(formatValue.yKey(conversion))).toBeInTheDocument();
  expect(getByText(formatValue.valueKey(cost))).toBeInTheDocument();
});
