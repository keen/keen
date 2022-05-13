import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';
import {
  AppearanceTypes,
  Placement,
  TransitionState,
} from 'react-toast-notifications';

import Toast from './toast.component';

const render = (overProps: Partial<ComponentProps<typeof Toast>> = {}) => {
  const props = {
    appearance: 'success' as AppearanceTypes,
    onDismiss: jest.fn(),
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
    showDismissButton: false,
    transitionDuration: 1000,
    autoDismiss: true,
    transitionState: 'entered' as TransitionState,
    children: 'content',
    autoDismissTimeout: 1000,
    isRunning: true,
    placement: 'top-left' as Placement,
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
