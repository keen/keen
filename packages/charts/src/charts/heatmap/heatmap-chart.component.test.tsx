import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';

import HeatmapChart from './heatmap-chart.component';

const render = (overProps: any = {}) => {
  const data = [
    { name: 'Windows XP 2013', users: 3, licenses: 52, shops: 12 },
    { name: 'MacOS', users: 19, licenses: 82, shops: 15 },
    { name: 'Linux', users: 20, licenses: 15, shops: 23 },
    { name: 'Android', users: 3, licenses: 15, shops: 30 },
  ];
  const labelSelector = 'name';
  const keys = ['users', 'licenses', 'shops'];
  const svgDimensions = { width: 700, height: 500 };
  const theme = {
    axisX: {
      enabled: false,
      title: {
        typography: {},
      },
      labels: {
        enabled: false,
        typography: {},
      },
    },
    axisY: {
      enabled: false,
      title: {
        typography: {},
      },
      labels: {
        enabled: false,
        typography: {},
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
    keys,
    labelSelector,
    theme,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(<HeatmapChart {...props} />);

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', async () => {
  const {
    wrapper: { getByText, container },
  } = render();

  const chart = await waitFor(() => container.querySelector('svg'));

  act(() => {
    fireEvent.mouseOver(chart.querySelector('rect'));
  });

  await waitFor(() => {
    expect(getByText(/\$3/i)).toBeInTheDocument();
  });
});
