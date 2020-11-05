import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import GaugeChart from './gauge-chart.component';

const render = (overProps: any = {}) => {
  const data = [{ 'keen.key': 'Result', 'keen.value': 100 }];
  const valueKey = 'keen.value';
  const svgDimensions = { width: 100, height: 100 };
  const theme = {
    colors: ['#85B4C3', '#CB5623', '#E29B1E'],
    gauge: {
      labels: {
        enabled: false,
      },
      border: {
        backgroundColor: '#27566D',
      },
      total: {
        enabled: false,
      },
    },
    tooltip: {
      enabled: true,
      labels: {
        typography: {},
      },
    },
  };
  const formatTooltip = value => `$${value}`;

  const props = {
    svgDimensions,
    data,
    valueKey,
    theme,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(<GaugeChart {...props} />);

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', async () => {
  const {
    wrapper: { getByTestId, getByText },
    props: { formatTooltip },
  } = render();

  const path = getByTestId('path-0');
  fireEvent.mouseEnter(path);

  await waitFor(() => {
    expect(getByText(formatTooltip('0'))).toBeInTheDocument();
  });
});
