import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Tabs from './tabs.component';
import { KEYBOARD_KEYS } from '../../constants';

const elements = [
  {
    label: 'Tab 1',
    id: 'tab-1',
  },
  {
    label: 'Tab 2',
    id: 'tab-2',
  },
  {
    label: 'Tab 3',
    id: 'tab-3',
  },
];

const render = (overProps: any = {}) => {
  const props = {
    onClick: jest.fn(),
    tabs: elements,
    ...overProps,
  };

  const wrapper = rtlRender(<Tabs {...props} />);

  return {
    props,
    wrapper,
  };
};

test('should be render tabs', () => {
  const {
    wrapper: { getByRole },
  } = render();
  const tabs = getByRole('tablist');

  expect(tabs).toBeInTheDocument();
});

test('should render provided number of tabs', () => {
  const {
    wrapper: { getAllByRole },
  } = render();
  const tabs = getAllByRole('tab');

  expect(tabs.length).toEqual(elements.length);
});

test('should call onClick event handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const tab = getByText(elements[0].label);
  fireEvent.click(tab);

  expect(props.onClick).toHaveBeenCalledWith(elements[0].id);
});

test('should call onClick event handler on Enter press', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const tab = getByText(elements[1].label);
  fireEvent.keyDown(tab, { key: 'Enter', keyCode: KEYBOARD_KEYS.ENTER });

  expect(props.onClick).toHaveBeenCalledWith(elements[1].id);
});
