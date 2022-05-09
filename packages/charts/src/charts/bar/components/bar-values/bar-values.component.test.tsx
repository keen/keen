import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import BarValues from './bar-values.component';

import { theme } from '../../../../theme';
import { ChartContext } from '../../../../contexts';

const render = (overProps: any = {}) => {
  const bars = [
    {
      x: 10,
      y: 10,
      width: 100,
      height: 100,
      color: 'black',
      key: 'marketing',
      value: 20,
    },
  ];

  const props = {
    autocolor: false,
    bars,
    groupMode: 'grouped',
    layout: 'vertical',
    ...overProps,
  };

  const wrapper = rtlRender(
    <ChartContext.Provider value={{ theme }}>
      <svg>
        <BarValues {...props} />
      </svg>
    </ChartContext.Provider>
  );

  return {
    wrapper,
    props,
  };
};

test('should set "fill" property for <text> element based on theme', () => {
  const {
    wrapper: { container },
  } = render();
  const text = container.querySelector('text');
  const textFill = text.getAttribute('fill');

  expect(textFill).toEqual(theme.bar.values.typography.fontColor);
});

test('should automatically set "fill" property for <text> element', () => {
  const {
    wrapper: { container },
  } = render({ autocolor: true });
  const text = container.querySelector('text');
  const textFill = text.getAttribute('fill');

  expect(textFill).toMatchInlineSnapshot(`"hsl(0, 0%, 80%)"`);
});
