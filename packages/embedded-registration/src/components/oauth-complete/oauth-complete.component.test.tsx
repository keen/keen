import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { render as rtlRender, waitFor } from '@testing-library/react';

import OAuthComplete from './oauth-complete.component';
import text from './text.json';

const render = (overProps: any = {}, history: History) => {
  const props = {
    onSuccess: jest.fn(),
    onError: jest.fn(),
    onSignup: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(
    <Router history={history}>
      <OAuthComplete {...props} />
    </Router>
  );

  return {
    wrapper,
    props,
  };
};

test('renders title', () => {
  const onSignup = jest.fn().mockResolvedValue({});
  const history = createMemoryHistory();
  history.push({
    pathname: '/',
    search: '?token=user_token',
  });
  const {
    wrapper: { getByText },
  } = render({ onSignup }, history);

  expect(getByText(text.title)).toBeInTheDocument();
});

test('calls "onSignup" handler with user token', () => {
  const onSignup = jest.fn().mockResolvedValue({});
  const history = createMemoryHistory();
  history.push({
    pathname: '/',
    search: '?token=user_token',
  });

  const { props } = render({ onSignup }, history);

  expect(props.onSignup).toHaveBeenCalledWith('user_token');
});

test('calls "onSuccess" handler with organization identifier', async () => {
  const onSignup = jest
    .fn()
    .mockResolvedValue({ organizationId: 'organizationId' });
  const history = createMemoryHistory();
  history.push({
    pathname: '/',
    search: '?token=user_token',
  });

  const { props } = render({ onSignup }, history);

  await waitFor(() => {
    expect(props.onSuccess).toHaveBeenCalledWith('organizationId', false);
  });
});

test('calls "onError" handler', async () => {
  const response = { status: 500, message: 'message' };
  const onSignup = jest.fn().mockRejectedValue(response);
  const history = createMemoryHistory();
  history.push({
    pathname: '/',
    search: '?token=user_token',
  });

  const { props } = render({ onSignup }, history);

  await waitFor(() => {
    expect(props.onError).toHaveBeenCalledWith(response);
  });
});
