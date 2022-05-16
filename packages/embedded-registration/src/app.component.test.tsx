import React, { ComponentProps } from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render as rtlRender } from '@testing-library/react';

import App from './app.component';
import { oauthConfig } from './app.fixtures';

const render = (
  overProps: Partial<ComponentProps<typeof App>> = {},
  history: History
) => {
  const props = {
    apiUrl: 'apiUrl',
    offerHandle: 'offerHandle',
    ctaLabel: 'ctaLabel',
    showOAuthProviders: false,
    oauthConfig: oauthConfig,
    isOAuthCompleteFlow: false,
    onSuccessCallback: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Router location={history.location} navigator={history}>
      <App {...props} />
    </Router>
  );

  return {
    wrapper,
    props,
  };
};

test('renders OAuth providers', () => {
  const history = createMemoryHistory();
  const {
    wrapper: { getByText },
  } = render(
    {
      showOAuthProviders: true,
    },
    history
  );
  const gitHubButton = getByText(oauthConfig.gitHubOAuth.label);
  const googleButton = getByText(oauthConfig.googleOAuth.label);

  expect(googleButton).toBeInTheDocument();
  expect(gitHubButton).toBeInTheDocument();
});

test('renders notification based on "error" query param', () => {
  const history = createMemoryHistory();
  history.push({
    pathname: '/',
    search: '?error=oauth_401',
  });

  const {
    wrapper: { getByTestId },
  } = render(
    {
      showOAuthProviders: false,
    },
    history
  );

  expect(getByTestId('error-notification')).toBeInTheDocument();
});

test('renders OAuth complete flow', () => {
  const history = createMemoryHistory();
  const {
    wrapper: { getByTestId },
  } = render(
    {
      showOAuthProviders: true,
      isOAuthCompleteFlow: true,
    },
    history
  );

  expect(getByTestId('oauth-complete')).toBeInTheDocument();
});
