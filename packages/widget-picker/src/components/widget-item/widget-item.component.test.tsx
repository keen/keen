import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import WidgetItem from './widget-item.component';

const render = (overProps: any = {}) => {
  const props = {
    icon: 'area-widget',
    onClick: jest.fn(),
    isActive: false,
    hasOptions: false,
    children: 'children',
    ...overProps,
  };

  const wrapper = rtlRender(<WidgetItem {...props} />);

  return {
    props,
    wrapper,
  };
};

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render();
  const element = getByTestId('widget-item');
  fireEvent.click(element);

  expect(props.onClick).toHaveBeenCalled();
});

test('renders "children" nodes', () => {
  const {
    wrapper: { getByTestId, getByText },
    props,
  } = render({ hasOptions: true });
  const element = getByTestId('settings-tick');
  fireEvent.mouseOver(element);

  const children = getByText(props.children);

  expect(children).toBeInTheDocument();
});
