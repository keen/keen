import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import ChartTooltip from './chart-tooltip.component';

import { ChartContext } from '../../contexts';

const render = (
  overProps: Partial<ComponentProps<typeof ChartTooltip>> = {}
) => {
  const props = {
    x: 0,
    y: 0,
    visible: false,
    children: 'tooltip',
    ...overProps,
  };

  const svgDimensions = { width: 100, height: 100 };
  const margins = { top: 10, left: 10, bottom: 10, right: 10 };
  const theme = {
    tooltip: {
      mode: 'light',
    },
  };

  const wrapper = rtlRender(
    <svg>
      <ChartContext.Provider value={{ svgDimensions, margins, theme }}>
        <ChartTooltip {...props} />
      </ChartContext.Provider>
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should not render "foreignObject" node', () => {
  const {
    wrapper: { container },
  } = render();
  const foreignObject = container.querySelector('foreignObject');

  expect(foreignObject).toBeNull();
});

test('should render "foreignObject" node', () => {
  const {
    wrapper: { container },
  } = render({ visible: true });
  const foreignObject = container.querySelector('foreignObject');

  expect(foreignObject).toBeInTheDocument();
});

test('should setup "foreignObject" x and y position', () => {
  const {
    wrapper: { container },
    props,
  } = render({ visible: true, x: 10, y: 20 });
  const foreignObject = container.querySelector('foreignObject');

  const x = parseFloat(foreignObject.getAttribute('x'));
  const y = parseFloat(foreignObject.getAttribute('y'));

  expect(x).toEqual(props.x);
  expect(y).toEqual(props.y);
});
