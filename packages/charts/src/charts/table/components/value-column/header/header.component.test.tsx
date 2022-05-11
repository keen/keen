import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import 'jest-styled-components';

import { Header } from './header.component';
import { TextAlignment } from './types';

const render = (overProps: Partial<ComponentProps<typeof Header>> = {}) => {
  const props = {
    isSorted: false,
    isSortedDescending: false,
    textAlignment: 'left' as TextAlignment,
    columnName: '@column',
    ...overProps,
  };

  const wrapper = rtlRender(<Header {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders column name', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.columnName)).toBeInTheDocument();
});

test('aligns column name based on "textAlignment" property', () => {
  const {
    wrapper: { getByTestId },
  } = render({
    textAlignment: 'right',
  });

  expect(getByTestId('table-value-header')).toHaveStyleRule(
    'justify-content',
    'flex-end'
  );
});
