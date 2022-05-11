import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Checkbox from './checkbox.component';
import { KEYBOARD_KEYS } from '../../constants';

const render = (overProps: Partial<ComponentProps<typeof Checkbox>> = {}) => {
  const props = {
    id: '@checkbox-1',
    ...overProps,
  };

  const wrapper = rtlRender(<Checkbox {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should call "onChange" handler', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { container },
    props,
  } = render({ onChange: mockFn });

  const element = container.querySelector('input[type="checkbox"]');
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalled();
});

test('should call "onChange" handler on Enter press', () => {
  const mockFn = jest.fn();
  const {
    wrapper: { container },
    props,
  } = render({ onChange: mockFn });

  const element = container.querySelector('input[type="checkbox"]');
  fireEvent.keyPress(element, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalled();
});

test('should set checkbox element "checked" to truthy value', () => {
  const {
    wrapper: { container },
  } = render({ checked: true });
  const element = container.querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;

  expect(element.checked).toBe(true);
});

test('should set checkbox element "checked" to false value', () => {
  const {
    wrapper: { container },
  } = render({ checked: false });
  const element = container.querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;

  expect(element.checked).toBe(false);
});

test('should set checkbox element "disabled" to truthy value', () => {
  const {
    wrapper: { container },
  } = render({ disabled: true });
  const element = container.querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;

  expect(element.disabled).toBe(true);
});

test('should set checkbox element "disabled" to false value', () => {
  const {
    wrapper: { container },
  } = render({ disabled: false });
  const element = container.querySelector(
    'input[type="checkbox"]'
  ) as HTMLInputElement;

  expect(element.disabled).toBe(false);
});

test('should set primary checkbox style', () => {
  const {
    wrapper: { container },
  } = render();
  expect(container).toMatchSnapshot();
});

test('should set secondary checkbox style', () => {
  const {
    wrapper: { container },
  } = render({ type: 'secondary' });
  expect(container).toMatchSnapshot();
});
