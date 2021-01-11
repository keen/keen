import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';

import { theme } from '../../theme';
import GaugeChart from './gauge-chart.component';

const render = (overProps: any = {}) => {
  const data = [{ 'keen.key': 'Result', 'keen.value': 100 }];
  const valueKey = 'keen.value';
  const svgDimensions = { width: 100, height: 100 };
  const formatTooltip = (value) => `$${value}`;

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

const originalGetBBox = (SVGElement as any).prototype.getBBox;

beforeEach(
  () =>
    ((SVGElement as any).prototype.getBBox = () => {
      return mockedRect;
    })
);

afterAll(() => ((SVGElement as any).prototype.getBBox = originalGetBBox));

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
