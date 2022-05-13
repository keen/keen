import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import ItemsPerPage from './items-per-page.component';
import { PER_PAGE_OPTIONS } from '../../constants';
import { KEYBOARD_KEYS } from '../../../../constants';

const render = (
  overProps: Partial<ComponentProps<typeof ItemsPerPage>> = {}
) => {
  const props = {
    onChange: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<ItemsPerPage {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should show default option if value is not provided', () => {
  const {
    wrapper: { getByText },
  } = render();

  const option = getByText(`${PER_PAGE_OPTIONS[0]} per page`);
  expect(option).toBeInTheDocument();
});

test('should show provided value', () => {
  const value = PER_PAGE_OPTIONS[2];
  const {
    wrapper: { getByText },
  } = render({ value });

  const option = getByText(`${value} per page`);
  expect(option).toBeInTheDocument();
});

test('should call onChange', () => {
  const {
    wrapper: { getByText },
    props: { onChange },
  } = render();

  const option = getByText(`${PER_PAGE_OPTIONS[0]} per page`);
  fireEvent.click(option);

  const chosenOption = getByText(`${PER_PAGE_OPTIONS[2]} per page`);
  fireEvent.click(chosenOption);

  expect(onChange).toHaveBeenCalledWith(PER_PAGE_OPTIONS[2]);
});

test('should support keyboard navigation for selection', () => {
  const {
    wrapper: { getByText },
    props: { onChange },
  } = render();

  const option = getByText(`${PER_PAGE_OPTIONS[0]} per page`);

  fireEvent.keyDown(option, {
    key: 'Enter',
    keyCode: KEYBOARD_KEYS.ENTER,
  });
  fireEvent.keyDown(option, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(option, {
    key: 'ArrowDown',
    keyCode: KEYBOARD_KEYS.DOWN,
  });
  fireEvent.keyDown(option, {
    key: 'Enter',
    keyCode: KEYBOARD_KEYS.ENTER,
  });

  expect(onChange).toHaveBeenCalledWith(PER_PAGE_OPTIONS[2]);
});
