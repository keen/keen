import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import Line from './line.component';

const render = (overProps: any = {}) => {
  const props = {
    x1: 10,
    x2: 15,
    y1: 10,
    y2: 30,
    color: 'white',
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Line {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should render svg <line /> element', () => {
  const {
    wrapper: { container },
  } = render();
  const line = container.querySelector('line');

  expect(line).toBeInTheDocument();
});

test('should inherit color', () => {
  const {
    wrapper: { container },
  } = render({ color: undefined });
  const line = container.querySelector('line');

  expect(line).toHaveStyle({ stroke: 'currentColor', 'stroke-width': 1 });
});

test('should set proper <line /> element properties', () => {
  const {
    wrapper: { container },
  } = render();
  const line = container.querySelector('line');

  expect(line).toMatchInlineSnapshot(`
    <line
      style="stroke: white; stroke-width: 1;"
      x1="10"
      x2="15"
      y1="10"
      y2="30"
    />
  `);
});
