import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import AxisTitle from './axis-title.component';
import { theme } from '../theme';
import { Orientation } from '../types';

const line = { x1: 0, x2: 100, y1: 100, y2: 0 };
const groupBox = { x: 10, y: 10, height: 10 };
const orientation = 'horizontal' as Orientation;
const title = 'Axis Title';

const render = (overProps: Partial<ComponentProps<typeof AxisTitle>> = {}) => {
  const props = {
    line,
    groupBox,
    orientation,
    titleSettings: theme.axisX.title,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <AxisTitle {...props}>{title}</AxisTitle>
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should render AxisTitle', () => {
  const {
    wrapper: { container },
  } = render();
  expect(container).toMatchSnapshot();
});

test('should render AxisTitle text', () => {
  const {
    wrapper: { getByText },
  } = render();
  expect(getByText(title)).toBeInTheDocument();
});

test('should render horizontal title with theme props', () => {
  const {
    wrapper: { getByText },
  } = render();
  const text = getByText(title);
  expect(text).toMatchInlineSnapshot(`
    <text
      data-elementid="horizontal-axis-title"
      fill="#27566D"
      font-family="Lato, sans-serif"
      font-size="14"
      font-style="normal"
      font-weight="bold"
      text-anchor="middle"
      x="50"
      y="40"
    >
      Axis Title
    </text>
  `);
});

test('should render vertical title with theme props', () => {
  const {
    wrapper: { getByText },
  } = render({ orientation: 'vertical' });
  const text = getByText(title);
  expect(text).toMatchInlineSnapshot(`
    <text
      data-elementid="vertical-axis-title"
      fill="#27566D"
      font-family="Lato, sans-serif"
      font-size="14"
      font-style="normal"
      font-weight="bold"
      style="transform: rotate(-90deg);"
      text-anchor="middle"
      x="-50"
      y="-10"
    >
      Axis Title
    </text>
  `);
});
