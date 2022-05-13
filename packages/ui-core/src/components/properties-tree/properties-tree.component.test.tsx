import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent, act } from '@testing-library/react';

import PropertiesTree from './properties-tree.component';

const render = (
  overProps: Partial<ComponentProps<typeof PropertiesTree>> = {}
) => {
  const props = {
    onClick: jest.fn(),
    expanded: false,
    properties: {},
    modalContainer: '',
    ...overProps,
  };

  const wrapper = rtlRender(<PropertiesTree {...props} />);

  return {
    props,
    wrapper,
  };
};

jest.useFakeTimers();

test('allows user to select nested property', () => {
  const properties = {
    category: ['category', 'string'],
    user: {
      id: ['user.id', 'number'],
    },
  };

  const {
    wrapper: { getByText },
    props,
  } = render({ properties });

  const title = getByText('user');
  fireEvent.click(title);

  const property = getByText('id');
  fireEvent.click(property);

  expect(props.onClick.mock.calls[0][1]).toEqual('user.id');
});

test('renders properties from all tree levels', () => {
  const properties = {
    category: ['category', 'string'],
    user: {
      details: {
        name: ['user.details.name', 'string'],
      },
    },
  };

  const {
    wrapper: { getByText },
  } = render({ properties, expanded: true });

  act(() => {
    jest.runAllTimers();
  });

  const property = getByText('name');

  expect(property).toBeInTheDocument();
});

test('expands all properties tree levels', () => {
  const properties = {
    category: ['category', 'string'],
    user: {
      details: {
        name: ['user.details.name', 'string'],
      },
    },
  };

  const {
    wrapper: { getByText, rerender },
    props,
  } = render({ properties });
  rerender(<PropertiesTree {...props} expanded={true} />);

  act(() => {
    jest.runAllTimers();
  });

  const property = getByText('name');

  expect(property).toBeInTheDocument();
});
