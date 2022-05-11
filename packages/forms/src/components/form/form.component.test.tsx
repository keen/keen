import React, { ComponentProps } from 'react';
import { fireEvent, render as rtlRender } from '@testing-library/react';

import Form from './form.component';

const render = (overProps: Partial<ComponentProps<typeof Form>> = {}) => {
  const props = {
    isSubmitting: false,
    onSubmit: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Form {...props}>
      <input />
    </Form>
  );

  return {
    wrapper,
    props,
  };
};

test('should render children', () => {
  const {
    wrapper: { container },
  } = render();
  const input = container.querySelector('input');
  expect(input).toBeInTheDocument();
});

test('should call "onSubmit" handler', () => {
  const {
    wrapper: { container },
    props: { onSubmit },
  } = render();
  const form = container.querySelector('form');
  fireEvent.keyDown(form, { key: 'Enter', keyCode: 13 });

  expect(onSubmit).toHaveBeenCalled();
});

test('should not call "onSubmit" handler for keys different that "Enter"', () => {
  const {
    wrapper: { container },
    props: { onSubmit },
  } = render();
  const form = container.querySelector('form');
  fireEvent.keyDown(form, { key: 'Space', keyCode: 20 });

  expect(onSubmit).not.toHaveBeenCalled();
});

test('should not call "onSubmit" handler for truthy "isSubmitting"', () => {
  const {
    wrapper: { container },
    props: { onSubmit },
  } = render({ isSubmitting: true });
  fireEvent.keyDown(container, { key: 'Enter', keyCode: 'Enter' });

  expect(onSubmit).not.toHaveBeenCalled();
});
