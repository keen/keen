import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { theme } from '../../theme';

import { chartData as data } from './heatmap-chart.fixtures';

import HeatmapChart from './heatmap-chart.component';

const render = (overProps: any = {}) => {
  const labelSelector = 'name';
  const keys = ['users', 'licenses', 'shops'];
  const svgDimensions = { width: 700, height: 500 };
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

const mockedRect = {
  x: 0,
  y: 0,
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 10,
  height: 12,
  toJSON: () => '',
};

const getBBox = SVGElement.prototype.getBBox;
const getComputedTextLength = SVGElement.prototype.getComputedTextLength;

beforeEach(() => {
  SVGElement.prototype.getBBox = () => {
    return mockedRect;
  };
  SVGElement.prototype.getComputedTextLength = () => 100;
});

afterAll(() => {
  SVGElement.prototype.getBBox = getBBox;
  SVGElement.prototype.getComputedTextLength = getComputedTextLength;
});

test('formats tooltip value', async () => {
  window.requestAnimationFrame = callback => {
    callback(null);
    return null;
  };

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
