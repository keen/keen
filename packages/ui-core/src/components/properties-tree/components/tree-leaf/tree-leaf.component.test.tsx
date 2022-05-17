import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import TreeLeaf from './tree-leaf.component';

const render = (overProps: Partial<ComponentProps<typeof TreeLeaf>> = {}) => {
  const props = {
    onClick: jest.fn(),
    propertyType: 'datetime',
    deepnessLevel: 1,
    propertyName: 'clicks',
    propertyPath: 'users.cliks',
    modalContainer: '',
    ...overProps,
  };

  const wrapper = rtlRender(<TreeLeaf {...props} />);

  return {
    props,
    wrapper,
  };
};

test('shows the property type', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.propertyType)).toBeInTheDocument();
});

test('allows user to select property', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  const element = getByText(props.propertyName);
  fireEvent.click(element);

  expect(props.onClick.mock.calls[0][1]).toEqual(props.propertyPath);
});
