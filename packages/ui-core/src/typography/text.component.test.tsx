import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';

import Text from './text.component';
import { Typography } from '../types';

const render = (overProps: Partial<ComponentProps<typeof Text>> = {}) => {
  const typography: Typography = {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    fontColor: 'black',
  };
  const props = {
    children: '@text',
    ...typography,
    ...overProps,
  };

  const wrapper = rtlRender(<Text {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders children nodes', () => {
  const {
    wrapper: { getByText },
  } = render();

  expect(getByText('@text')).toBeInTheDocument();
});

test('allows to specify HTML element node', () => {
  const {
    wrapper: { container },
  } = render({
    htmlElement: 'section',
  });

  const element = container.querySelector('section');
  expect(element).toBeInTheDocument();
});
