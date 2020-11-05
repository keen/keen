import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { topology } from './choropleth-chart.fixtures';

import ChoroplethChart from './choropleth-chart.component';

const render = (overProps: any = {}) => {
  const svgDimensions = {
    width: 600,
    height: 300,
  };
  const data = [{ 'geo.country': 'Poland', result: 1230 }];
  const labelSelector = 'geo.country';
  const geoKey = 'geo.country';
  const colorMode = 'continuous';
  const colorSteps = 5;
  const valueKey = 'result';
  const formatTooltip = value => `$${value}`;

  const props = {
    svgDimensions,
    data,
    labelSelector,
    geoKey,
    colorMode,
    colorSteps,
    valueKey,
    topology,
    formatTooltip,
    ...overProps,
  };

  const wrapper = rtlRender(<ChoroplethChart {...props} />);

  return {
    wrapper,
    props,
  };
};

test('formats tooltip value', async () => {
  const {
    wrapper: { getByText, container },
    props: { data, geoKey, formatTooltip },
  } = render();

  const choroplethChart = container.querySelector('svg');
  fireEvent.mouseOver(choroplethChart.querySelector('path'));

  const [firstSeries] = data;
  const key = firstSeries[geoKey];
  const { result } = firstSeries;

  await waitFor(() => {
    expect(getByText(`${key} - ${formatTooltip(result)}`)).toBeInTheDocument();
  });
});
