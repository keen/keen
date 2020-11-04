import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import TooltipContent from './tooltip-content.component';

const render = (overProps: any = {}) => {
  const data = [
    { channel: 'Facebook', cost: 310, conversion: 352, users: 500 },
  ];
  const labelSelector = 'channel';
  const selectors = [{ color: '#487650', selector: [0] }];
  const valueKey = 'cost';
  const xDomainKey = 'users';
  const yDomainKey = 'conversion';
  const formatTooltip = {
    xKey: value => `${value} X`,
    yKey: value => `${value} Y`,
    valueKey: value => `${value} value`,
  };

  const props = {
    data,
    labelSelector,
    selectors,
    valueKey,
    xDomainKey,
    yDomainKey,
    formatTooltip,
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
    wrapper: { getByTestId },
  } = render();
  const tooltipContent = getByTestId('tooltip-content');

  expect(tooltipContent).toMatchSnapshot();
});
