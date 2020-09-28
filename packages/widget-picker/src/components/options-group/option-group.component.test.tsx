import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import OptionsGroup from './options-group.component';

const options = [
  {
    label: 'Option 1',
    isActive: () => false,
    defaultValue: {
      widget: 'choropleth',
    },
  },
  {
    label: 'Option 2',
    isActive: () => false,
    defaultValue: {
      widget: 'metric',
    },
  },
];

const render = (overProps: any = {}) => {
  const props = {
    id: 'id',
    title: 'title',
    options,
    settings: {},
    isActiveOption: false,
    onClick: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<OptionsGroup {...props} />);

  return {
    props,
    wrapper,
  };
};

test('calls "onClick" handler', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText('Option 1');

  fireEvent.click(element);
  expect(props.onClick).toHaveBeenCalled();
});

test('renders group title', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const element = getByText(props.title);

  expect(element).toBeInTheDocument();
});
