/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ComponentProps } from 'react';
import {
  render as rtlRender,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';

import RegistrationForm from './registration-form.component';

const render = (
  overProps: Partial<ComponentProps<typeof RegistrationForm>> = {}
) => {
  const props = {
    buttonLabel: 'Register Now',
    apiUrl: 'https://api-keen.io',
    onSignup: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
    ...overProps,
  };

  const wrapper = rtlRender(<RegistrationForm {...props} />);

  return {
    wrapper,
    props,
  };
};

const fields = [
  { name: 'firstName', value: 'John' },
  { name: 'lastName', value: 'Smith' },
  { name: 'companyName', value: 'Company' },
  { name: 'email', value: 'john.smith@keen.io' },
  { name: 'password', value: '$TrongPass4rd' },
];

test('renders button with label', () => {
  const {
    wrapper: { getByText },
    props,
  } = render();

  expect(getByText(props.buttonLabel)).toBeInTheDocument();
});

test('renders "firstName" field validation error', async () => {
  const {
    wrapper: { getByText, container },
  } = render();
  const input = container.querySelector('input[name="firstName"]');

  act(() => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(getByText('Please enter your first name')).toBeInTheDocument();
  });
});

test('renders "lastName" field validation error', async () => {
  const {
    wrapper: { getByText, container },
  } = render();
  const input = container.querySelector('input[name="lastName"]');

  act(() => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(getByText('Please enter your last name')).toBeInTheDocument();
  });
});

test('renders "email" field validation error', async () => {
  const {
    wrapper: { getByText, container },
  } = render();
  const input = container.querySelector('input[name="email"]');

  act(() => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(getByText('Please enter your email')).toBeInTheDocument();
  });
});

test('renders "companyName" field validation error', async () => {
  const {
    wrapper: { getByText, container },
  } = render();
  const input = container.querySelector('input[name="companyName"]');

  act(() => {
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.blur(input);
  });

  await waitFor(() => {
    expect(
      getByText(
        'Please enter the company name or click the box below the field'
      )
    ).toBeInTheDocument();
  });
});

test('calls "onSignup" event handler', async () => {
  const organizationId = 'organizationId';
  const onSignup = jest.fn().mockResolvedValue({
    organizationId,
  });

  const {
    wrapper: { container },
    props,
  } = render({ onSignup });
  act(() => {
    fields.forEach(({ name, value }) => {
      const input = container.querySelector(`input[name="${name}"]`);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    });
  });

  const button = container.querySelector('button[type="button"]');
  fireEvent.click(button);

  await waitFor(() => {
    expect(props.onSignup).toHaveBeenCalledWith({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@keen.io',
      password: '$TrongPass4rd',
      companyName: 'Company',
      companyDisclaimer: false,
    });
  });
});

test('calls "onSuccess" handler', async () => {
  const organizationId = 'organizationId';
  const onSignup = jest.fn().mockResolvedValue({
    organizationId,
  });

  const {
    wrapper: { container },
    props,
  } = render({ onSignup });
  act(() => {
    fields.forEach(({ name, value }) => {
      const input = container.querySelector(`input[name="${name}"]`);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    });
  });

  const button = container.querySelector('button[type="button"]');
  fireEvent.click(button);

  await waitFor(() => {
    expect(props.onSuccess).toHaveBeenCalledWith(organizationId, false);
  });
});

test('renders "email" categorized as spam error', async () => {
  const onSignup = jest.fn().mockRejectedValue({
    message: 'error',
    data: {
      errors: {
        email: 'SPAM',
      },
    },
  });

  const {
    wrapper: { container, getByText },
  } = render({ onSignup });
  act(() => {
    fields.forEach(({ name, value }) => {
      const input = container.querySelector(`input[name="${name}"]`);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    });
  });

  const button = container.querySelector('button[type="button"]');
  fireEvent.click(button);

  await waitFor(() => {
    expect(
      getByText(
        'Sorry, the email you have entered has been categorized as possible spam. Use a different email address, or contact us at team@keen.io'
      )
    ).toBeInTheDocument();
  });
});

test('calls "onError" handler', async () => {
  const onSignup = jest.fn().mockRejectedValue({
    message: 'error',
  });

  const {
    wrapper: { container },
    props,
  } = render({ onSignup });
  act(() => {
    fields.forEach(({ name, value }) => {
      const input = container.querySelector(`input[name="${name}"]`);
      fireEvent.change(input, { target: { value } });
      fireEvent.blur(input);
    });
  });

  const button = container.querySelector('button[type="button"]');
  fireEvent.click(button);

  await waitFor(() => {
    expect(props.onError).toHaveBeenCalledWith({
      message: 'error',
    });
  });
});
