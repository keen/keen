import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import PciField from './pci-field.component';

const render = (overProps: any = {}) => {
  const props = {
    label: 'Card number',
    id: 'card-number',
    ...overProps,
  };

  const wrapper = rtlRender(<PciField {...props} />);

  return {
    wrapper,
    props,
  };
};

test('should render element with "id" attribute', () => {
  const {
    wrapper: { container },
    props: { id },
  } = render();
  const element = container.querySelector(`#${id}`);

  expect(element).toBeInTheDocument();
});

test('should render <Error /> component', () => {
  const error = 'Invalid card number';
  const {
    wrapper: { getByText },
  } = render({ error });

  expect(getByText(error)).toBeInTheDocument();
});
