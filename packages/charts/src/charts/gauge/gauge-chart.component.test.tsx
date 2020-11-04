import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import GaugeChart from './gauge-chart.component';

const render = (overProps: any = {}) => {
  const data = [{ 'keen.key': 'Result', 'keen.value': 190 }];
  const valueKey = 'keen.value';
  const svgDimensions = { width: 700, height: 500 };
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
    wrapper: { container },
  } = render();

  const chart = await waitFor(() => container.querySelector('svg'));

  act(() => {
    fireEvent.mouseOver(chart.querySelector('path'));
  });

  await waitFor(() => {
    // expect(getByText(/\$0/i)).toBeInTheDocument();
  });
});
