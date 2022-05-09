/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { Typography } from '@keen.io/ui-core';

import PieLabel from './pie-label.component';

const render = (overProps: any = {}) => {
  const typography: Typography = {
    fontSize: 12,
    fontFamily: 'sans-serif',
    fontColor: '#000',
    fontStyle: 'normal',
    fontWeight: 'normal',
  };

  const props = {
    sliceBackground: '#fff',
    autocolor: false,
    ...typography,
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <PieLabel {...props}>50%</PieLabel>
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should render "text" element with typography font color', () => {
  const {
    wrapper: { container },
    props: { fontColor },
  } = render();
  const text = container.querySelector('text');
  const fill = text.getAttribute('fill');

  expect(fill).toEqual(fontColor);
});

test('should set typography for "text" element', () => {
  const {
    wrapper: { container },
    props: { fontSize, fontFamily, fontStyle, fontWeight },
  } = render();
  const text = container.querySelector('text');

  expect(text).toHaveStyle({ fontSize, fontFamily, fontStyle, fontWeight });
});

it('should render "text" element with adjusted font color', () => {
  const {
    wrapper: { container },
  } = render({ autocolor: true });
  const text = container.querySelector('text');
  const fill = text.getAttribute('fill');

  expect(fill).toMatchInlineSnapshot(`"hsl(0, 0%, 20%)"`);
});

test('should set typography for autocolor "text" element', () => {
  const {
    wrapper: { container },
    props: { fontSize, fontFamily, fontStyle, fontWeight },
  } = render({ autocolor: true });
  const text = container.querySelector('text');

  expect(text).toHaveStyle({ fontSize, fontFamily, fontStyle, fontWeight });
});
