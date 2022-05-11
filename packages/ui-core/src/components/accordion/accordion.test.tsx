import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Accordion from './accordion.component';

const render = (overProps: Partial<ComponentProps<typeof Accordion>> = {}) => {
  const props = {
    title: 'Accordion title',
    children: 'Lorem ipsum',
    ...overProps,
  };
  const wrapper = rtlRender(<Accordion {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render accordion title, content should not be visible', () => {
  const {
    wrapper: { getByText, queryByText },
    props,
  } = render();

  expect(getByText(props.title)).toBeInTheDocument();
  expect(queryByText(props.children)).toBeNull();
});

test('calls "onChange" handler with open state', async () => {
  const mockFn = jest.fn();
  const {
    wrapper: { getByText },
    props,
  } = render({ isOpen: false, onChange: mockFn });

  const element = getByText(props.title);
  fireEvent.click(element);

  expect(mockFn).toHaveBeenCalledWith(true);
});

test('should render content for open accordion', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({ isOpen: true });

  expect(getByText(props.children)).toBeInTheDocument();
});
