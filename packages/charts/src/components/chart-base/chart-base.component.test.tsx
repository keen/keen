import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import ChartBase from '../chart-base';

import { theme } from '../../theme';

const render = (overProps: Partial<ComponentProps<typeof ChartBase>> = {}) => {
  const margins = {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };

  const props = {
    theme,
    margins,
    svgDimensions: { width: 100, height: 100 },
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartBase {...props}>
      <text data-testid="chart-content" />
    </ChartBase>
  );

  return {
    props,
    wrapper,
  };
};

test('creates SVG element', () => {
  const {
    wrapper: { container },
  } = render();

  expect(container.querySelector('svg')).toBeInTheDocument();
});

test('renders children nodes', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  expect(getByTestId('chart-content')).toBeInTheDocument();
});
