import React from 'react';
import {
  render as rtlRender,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import 'jest-styled-components';

import Accordion from './accordion.component';

const render = (overProps: any = {}) => {
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

test('should render content when the user clicks on title', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText(props.title);
  fireEvent.click(element);

  expect(getByText(props.children)).toBeInTheDocument();
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

test('should hide content when the user click on title', async () => {
  const {
    wrapper: { getByText, queryByText },
    props,
  } = render({ isOpen: true });

  const element = getByText(props.title);
  fireEvent.click(element);

  await waitFor(() => expect(queryByText(props.children)).toBeNull());
});
