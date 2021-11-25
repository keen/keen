import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Typography } from '@keen.io/ui-core';

import GaugeLabels from './gauge-labels.component';
import { MAX_VALUE_PLACEHOLDER } from './constants';

const render = (overProps: any = {}) => {
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 14,
    fontFamily: 'Lato Regular, sans-serif',
    fontColor: 'black',
  };

  const props = {
    arcPath: '',
    minValue: 0,
    maxValue: 100,
    typography,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <GaugeLabels {...props} />
    </svg>
  );

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

test('renders minimum and maximum values', () => {
  const {
    wrapper: { getByText },
    props: { minValue, maxValue },
  } = render();

  const minLabel = getByText('' + minValue);
  const maxLabel = getByText('' + maxValue);

  expect(minLabel).toBeInTheDocument();
  expect(maxLabel).toBeInTheDocument();
});

test('renders placeholder for maxValue if it is not provided', () => {
  const {
    wrapper: { getByText },
  } = render({ maxValue: null });

  expect(getByText(MAX_VALUE_PLACEHOLDER)).toBeInTheDocument();
});

test('applies formatters to the labels', () => {
  const formatValue = '${} $';
  const {
    wrapper: { getByText },
  } = render({ formatValue });

  expect(getByText('0 $')).toBeInTheDocument();
  expect(getByText('100 $')).toBeInTheDocument();
});
