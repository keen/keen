import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import Toast from './toast.component';

const render = (overProps: any = {}) => {
  const props = {
    appearance: 'success',
    onDismiss: jest.fn(),
    showDismissButton: false,
    transitionDuration: 1000,
    autoDismiss: true,
    transitionState: 'entered',
    children: 'content',
    autoDismissTimeout: 1000,
    ...overProps,
  };

  const wrapper = rtlRender(<Toast {...props} />);

  return {
    wrapper,
    props,
  };
};

test('calls "onDismiss" handler', () => {
  const {
    wrapper: { getByTestId },
    props,
  } = render({ showDismissButton: true });

  const button = getByTestId('dismiss-button');
  fireEvent.click(button);

  expect(props.onDismiss).toHaveBeenCalled();
});
