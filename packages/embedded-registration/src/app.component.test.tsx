import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';

import App from './app.component';
import { oauthConfig } from './app.fixtures';

const render = (overProps: any = {}) => {
  const props = {
    apiUrl: 'apiUrl',
    offerHandle: 'offerHandle',
    ctaLabel: 'ctaLabel',
    showOAuthProviders: false,
    oauthConfig: oauthConfig,
    onSuccessCallback: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Router>
      <App {...props} />
    </Router>
  );

  return {
    wrapper,
    props,
  };
};

test('renders OAuth providers', () => {
  const {
    wrapper: { getByText },
  } = render({
    showOAuthProviders: true,
  });
  const gitHubButton = getByText(oauthConfig.gitHubOAuth.label);
  const googleButton = getByText(oauthConfig.googleOAuth.label);

  expect(googleButton).toBeInTheDocument();
  expect(gitHubButton).toBeInTheDocument();
});
