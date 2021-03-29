import React from 'react';
import { render as rtlRender } from '@testing-library/react';

import EmptySearch from './empty-search.component';

const render = (overProps: any = {}) => {
  const props = {
    message: 'Lorem ipsum...',
    ...overProps,
  };

  const wrapper = rtlRender(<EmptySearch {...props} />);

  return {
    wrapper,
    props,
  };
};

test('renders Empty Search component', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();
  const message = getByText(props.message);

  expect(message).toBeInTheDocument();
});
