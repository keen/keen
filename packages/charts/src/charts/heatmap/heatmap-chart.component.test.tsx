import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { chartData as data } from './heatmap-chart.fixtures';

import HeatmapChart from './heatmap-chart.component';

const render = (overProps: any = {}) => {
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
    props: { data, formatTooltip, keys },
  } = render();

  const chart = container.querySelector('svg');
  fireEvent.mouseOver(chart.querySelector('rect'));

  const [firstSeries] = data;
  const result = firstSeries[keys[0]];

  await waitFor(() => {
    expect(getByText(formatTooltip(result))).toBeInTheDocument();
  });
});
