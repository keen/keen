import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import Tick from './tick.component';

import { Orientation } from '../../types';

const render = (overProps: Partial<ComponentProps<typeof Tick>> = {}) => {
  const props = {
    orientation: Orientation.HORIZONTAL,
    x: 10,
    y: 25,
    size: 10,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Tick {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should set svg group coordinates', () => {
  const {
    wrapper: { container },
  } = render();
  const g = container.querySelector('g');
  const transform = g.getAttribute('transform');

  expect(transform).toMatchInlineSnapshot(`"translate(10, 25)"`);
});

test('should set line position for vertical orientation', () => {
  const {
    wrapper: { container },
  } = render();
  const line = container.querySelector('line');

  expect(line).toMatchInlineSnapshot(`
    <line
      stroke="currentColor"
      y2="10"
    />
  `);
});

test('should set line position for horizontal orientation', () => {
  const {
    wrapper: { container },
  } = render({ orientation: Orientation.VERTICAL });
  const line = container.querySelector('line');

  expect(line).toMatchInlineSnapshot(`
    <line
      stroke="currentColor"
      x2="-10"
    />
  `);
});

test('should render children', () => {
  const {
    wrapper: { container },
  } = render({ children: <text /> });
  const text = container.querySelector('text');

  expect(text).toBeInTheDocument();
});
