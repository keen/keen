import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import Toggle from './toggle.component';
import { KEYBOARD_KEYS } from '../../constants';

const render = (overProps: any = {}) => {
  const props = {
    ...overProps,
  };
  const wrapper = rtlRender(<Toggle {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render Toggle component', () => {
  const { wrapper } = render();
  expect(wrapper).toMatchSnapshot();
});

test('should call onChange if provided', () => {
  const onChange = jest.fn();
  const {
    wrapper: { getByRole },
    props,
  } = render({
    onChange,
  });
  const element = getByRole('switch');
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalled();
});

test('should call onChange using keyboard', () => {
  const onChange = jest.fn();
  const {
    wrapper: { getByRole },
    props,
  } = render({
    onChange,
  });
  const element = getByRole('switch');
  fireEvent.keyDown(element, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalled();
});
