import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import Text from './text.component';

const render = (overProps: Partial<ComponentProps<typeof Text>> = {}) => {
  const props = {
    dx: 0,
    dy: 0,
    children: '@keen',
    ...overProps,
  };

  const wrapper = rtlRender(
    <svg>
      <Text {...props} />
    </svg>
  );

  return {
    wrapper,
    props,
  };
};

test('should render children', () => {
  const {
    wrapper: { getByText },
    props: { children },
  } = render();
  expect(getByText(children)).toBeInTheDocument();
});

test('should set coordinates for <text /> element', () => {
  const {
    wrapper: { container },
  } = render({ dx: 5, dy: 10 });

  expect(container).toMatchInlineSnapshot(`
    <div>
      <svg>
        <text
          dx="5"
          dy="10"
        >
          @keen
        </text>
      </svg>
    </div>
  `);
});
