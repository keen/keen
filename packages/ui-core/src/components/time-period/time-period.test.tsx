import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TimePeriod from './time-period.component';
import { KEYBOARD_KEYS } from '../../constants';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

const render = (overProps: Partial<ComponentProps<typeof TimePeriod>> = {}) => {
  const props = {
    relativity: 'this',
    value: 14,
    units: 'days',
    label: '',
    unitsPlaceholder: '',
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<TimePeriod {...props} />);

  return {
    props,
    wrapper,
  };
};
mockAllIsIntersecting(true);
beforeEach(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

test('allows user to set timeframe value', () => {
  const {
    props,
    wrapper: { getByTestId },
  } = render();

  const input = getByTestId('relative-time-input');
  fireEvent.change(input, { target: { value: 30 } });

  expect(props.onChange).toHaveBeenCalledWith('this_30_days');
});

test('allows user to select timeframe unit', () => {
  const {
    props,
    wrapper: { getByTestId, getByText },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.click(field);

  const element = getByText('weeks');
  fireEvent.click(element);

  expect(props.onChange).toHaveBeenCalledWith('this_14_weeks');
});

test('allows user to select timeframe unit using keyboard', () => {
  const {
    props,
    wrapper: { getByTestId, container },
  } = render();

  const field = getByTestId('dropable-container');
  fireEvent.keyDown(field, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  fireEvent.keyDown(container, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(container, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(container, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onChange).toHaveBeenCalledWith('this_14_months');
});
