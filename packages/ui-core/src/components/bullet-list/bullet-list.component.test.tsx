import React, { ComponentProps } from 'react';
import { render as rtlRender } from '@testing-library/react';
import BulletList from './bullet-list.component';

const render = (overProps: Partial<ComponentProps<typeof BulletList>> = {}) => {
  const items = [
    {
      color: 'red',
      data: '12',
    },
    {
      color: 'blue',
      data: '22',
    },
  ];

  const props = {
    items,
    renderItem: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<BulletList {...props} />);
  return {
    wrapper,
    props,
  };
};

test('calls renderItem prop', () => {
  const { props } = render();

  expect(props.renderItem).toHaveBeenCalledTimes(props.items.length);
});

test('renders list items', () => {
  const {
    wrapper: { getByText },
    props,
  } = render({ renderItem: (idx, item) => item.data });

  props.items.forEach((item) =>
    expect(getByText(item.data)).toBeInTheDocument()
  );
});

test('renders list items as objects', () => {
  const items = [
    {
      color: 'red',
      data: {
        label: 'Label1',
        value: '12',
      },
    },
    {
      color: 'blue',
      data: {
        label: 'Label2',
        value: '22',
      },
    },
  ];
  const {
    wrapper: { getByText },
  } = render({
    items,
    renderItem: (idx, item) => `${item.data.label} - ${item.data.value}`,
  });

  expect(getByText('Label1 - 12')).toBeInTheDocument();
  expect(getByText('Label2 - 22')).toBeInTheDocument();
});
