import React, { ComponentProps, createRef } from 'react';
import { render as rtlRender } from '@testing-library/react';
import { scaleBand, scaleLinear } from 'd3-scale';
import { ScaleSettings } from '@keen.io/charts-utils';

import ChartBase from '../chart-base';
import Axes from './axes.component';

import { theme } from '../../theme';

import { Orientation } from '../../types';

const render = (
  overProps: Partial<ComponentProps<typeof Axes>> = {},
  overChartBaseProps: Partial<ComponentProps<typeof ChartBase>> = {}
) => {
  const margins = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const xScale = scaleBand().domain(['Marketing', 'Sales', 'IT']);
  const yScale = scaleLinear().domain([0, 100]);

  const props = {
    xScale,
    yScale,
    initialMargins: margins,
    onComputeLayout: jest.fn(),
    ...overProps,
  };

  const chartBaseProps = {
    theme,
    margins,
    svgDimensions: { width: 100, height: 100 },
    xScaleSettings: {} as ScaleSettings,
    yScaleSettings: {} as ScaleSettings,
    ...overChartBaseProps,
  };

  const wrapper = rtlRender(
    <ChartBase {...chartBaseProps}>
      <Axes {...props} />
    </ChartBase>
  );

  return {
    props,
    wrapper,
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

const getBBox = (SVGElement as any).prototype.getBBox;
const getComputedTextLength = (SVGElement as any).prototype
  .getComputedTextLength;

beforeEach(() => {
  (SVGElement as any).prototype.getBBox = () => {
    return mockedRect;
  };
  (SVGElement as any).prototype.getComputedTextLength = () => 100;
});

afterAll(() => {
  (SVGElement as any).prototype.getBBox = getBBox;
  (SVGElement as any).prototype.getComputedTextLength = getComputedTextLength;
});

test('renders rulers for axes', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId(`ruler-${Orientation.HORIZONTAL}`)).toBeInTheDocument();
  expect(getByTestId(`ruler-${Orientation.VERTICAL}`)).toBeInTheDocument();
});

test('do not renders ruler for axis X', () => {
  const themeSettings = {
    ...theme,
    axisX: {
      ...theme.axisX,
      enabled: false,
    },
  };
  const {
    wrapper: { queryByTestId },
  } = render({}, { theme: themeSettings });

  expect(
    queryByTestId(`ruler-${Orientation.HORIZONTAL}`)
  ).not.toBeInTheDocument();
});

test('do not renders ruler for axis Y', () => {
  const themeSettings = {
    ...theme,
    axisY: {
      ...theme.axisY,
      enabled: false,
    },
  };
  const {
    wrapper: { queryByTestId },
  } = render({}, { theme: themeSettings });

  expect(
    queryByTestId(`ruler-${Orientation.VERTICAL}`)
  ).not.toBeInTheDocument();
});

test('computes chart layout based on axes dimensions', () => {
  const svgElement = createRef();
  window.requestAnimationFrame = (callback) => {
    callback(null);
    return null;
  };

  const {
    props: { onComputeLayout },
  } = render({
    svgElement,
    useDynamicLayout: true,
  });

  expect(onComputeLayout).toHaveBeenCalled();
});

test('uses static chart layout based on provided margins', () => {
  const {
    props: { onComputeLayout },
  } = render({
    useDynamicLayout: false,
  });

  expect(onComputeLayout).not.toHaveBeenCalled();
});
