import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import { theme } from '../../../../theme';
import { ChartContext } from '../../../../contexts';
import { chartData as data } from '../../line-chart.fixtures';

import Tooltip from './tooltip.component';

const render = (overProps: any = {}) => {
  const selectors = [{ selector: [1, 'books'], color: '#CB5623' }];
  const formatValue = (value) => `$${value}`;

  const props = {
    data,
    selectors,
    formatValue,
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={{ theme }}>
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
    props: { formatValue, selectors, data },
  } = render();

  const [{ selector }] = selectors;
  const [index, key] = selector;
  const result = data[index][key];

  expect(getByText(formatValue(result))).toBeInTheDocument();
});
