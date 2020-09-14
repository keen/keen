import React from 'react';
import { render as rtlRender, fireEvent } from '@testing-library/react';

import OAuthProviders from './oauth-providers.component';
import { OAuthSource } from './types';

const render = (overProps: any = {}) => {
  const googleOAuth = {
    label: 'Sign up with Google',
    url: 'http://google',
    clientId: 'keen-client-id',
    redirectUri: 'keen-redirect',
    scope: 'email profile',
  };

  const gitHubOAuth = {
    label: 'Sign up with Github',
    url: 'https://github.com/login/oauth/authorize',
    scope: 'user:email',
    clientId: 'keen-client-id',
  };

  const host = 'https//keen-test.io';

  const props = {
    config: {
      googleOAuth,
      gitHubOAuth,
      host,
    },
    ...overProps,
  };

  const wrapper = rtlRender(<OAuthProviders {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('<OAuthProviders />', () => {
  test('should redirect to Google OAuth page', () => {
    const {
      wrapper: { getByTestId },
    } = render({ source: OAuthSource.ACCEPT_INVITE });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        replace: jest.fn(),
      },
    });

    const button = getByTestId('google-oauth');
    fireEvent.click(button);

    const callArguments = window.location.replace['mock'].calls[0][0];

    expect(callArguments).toMatchSnapshot();
    expect(window.location.replace).toHaveBeenCalledWith(callArguments);
  });

  test('should redirect to Github OAuth page', () => {
    const {
      wrapper: { getByTestId },
    } = render({ source: OAuthSource.ACCEPT_INVITE });
    Object.defineProperty(window, 'location', {
      writable: true,
      value: {
        replace: jest.fn(),
      },
    });

    const button = getByTestId('github-oauth');
    fireEvent.click(button);

    const callArguments = window.location.replace['mock'].calls[0][0];

    expect(callArguments).toMatchSnapshot();
    expect(window.location.replace).toHaveBeenCalledWith(callArguments);
  });
});
