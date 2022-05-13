import React, { ComponentProps } from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import OAuthProviders from './oauth-providers.component';
import { googleOAuth, gitHubOAuth } from './oauth-providers.fixtures';

import { OAuthUserAction } from './types';

const render = (
  overProps: Partial<ComponentProps<typeof OAuthProviders>> = {}
) => {
  const props = {
    action: OAuthUserAction.LOGIN,
    requestInitiatorUrl: 'requestInitiatorUrl',
    callbackHandlerHost: 'callbackHandlerHost',
    config: {
      googleOAuth,
      gitHubOAuth,
    },
    ...overProps,
  };

  const wrapper = rtlRender(<OAuthProviders {...props} />);

  return {
    wrapper,
    props,
  };
};

beforeEach(() => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      replace: jest.fn(),
    },
  });
});

test('should redirect to Google OAuth page', () => {
  const {
    wrapper: { getByTestId },
  } = render();

  const button = getByTestId('google-oauth');
  fireEvent.click(button);

  const callArguments = window.location.replace['mock'].calls[0][0];

  expect(callArguments).toMatchSnapshot();
  expect(window.location.replace).toHaveBeenCalledWith(callArguments);
});

test('should redirect to Github OAuth page', () => {
  const {
    wrapper: { getByTestId },
  } = render({ source: OAuthUserAction.ACCEPT_INVITE });

  const button = getByTestId('github-oauth');
  fireEvent.click(button);

  const callArguments = window.location.replace['mock'].calls[0][0];

  expect(callArguments).toMatchSnapshot();
  expect(window.location.replace).toHaveBeenCalledWith(callArguments);
});
