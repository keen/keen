import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import OptionsGroup from './options-group.component';
import { OptionItem, OptionValue } from '../../types';

const options: OptionItem[] = [
  {
    label: 'Option 1',
    isActive: () => false,
    defaultValue: {
      widget: 'choropleth',
    } as OptionValue,
  },
  {
    label: 'Option 2',
    isActive: () => false,
    defaultValue: {
      widget: 'metric',
    } as OptionValue,
  },
];

const render = (
  overProps: Partial<ComponentProps<typeof OptionsGroup>> = {}
) => {
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
