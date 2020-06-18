/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { waitFor } from '@testing-library/react';

import RegisterForm from './form.component';

export const updateField = (
  input: ReactWrapper,
  name: string,
  value: string | number
) => {
  input.simulate('change', {
    persist: () => {},
    target: {
      name,
      value,
    },
  });
  input.simulate('blur', { target: { name, value } });
};

const setup = (overProps: any = {}) => {
  const props = {
    buttonLabel: 'Register Now',
    apiUrl: 'https://api-keen.io',
    onSignup: jest.fn(),
    onSuccess: jest.fn(),
    onError: jest.fn(),
    ...overProps,
  };

  const wrapper = mount(<RegisterForm {...props} />);

  return {
    wrapper,
    props,
  };
};

describe('@keen.io/embedded-registration - <RegisterForm />', () => {
  const fields = [
    { name: 'firstName', value: 'John' },
    { name: 'lastName', value: 'Doe' },
    { name: 'companyName', value: 'Company' },
    { name: 'email', value: 'john.doe@keen.io' },
    { name: 'password', value: '$TrongPass4rd' },
  ];

  it('should set button label based on "buttonLabel" property', () => {
    const { wrapper, props } = setup();
    const button = wrapper.find('button[type="button"]');

    expect(button.text()).toEqual(props.buttonLabel);
  });

  it('should show "firstName" field validation error', async () => {
    const { wrapper } = setup();

    const input = wrapper.find('input[name="firstName"]');
    updateField(input, 'firstName', '');

    await waitFor(() => {
      wrapper.update();
      const error = wrapper.find('div[data-error="firstName"]');

      expect(error.first().text()).toMatchInlineSnapshot(
        `"Please enter your first name"`
      );
    });
  });

  it('should show "lastName" field validation error', async () => {
    const { wrapper } = setup();

    const input = wrapper.find('input[name="lastName"]');
    updateField(input, 'lastName', '');

    await waitFor(() => {
      wrapper.update();
      const error = wrapper.find('div[data-error="lastName"]');

      expect(error.first().text()).toMatchInlineSnapshot(
        `"Please enter your last name"`
      );
    });
  });

  it('should show "email" field validation error', async () => {
    const { wrapper } = setup();

    const input = wrapper.find('input[name="email"]');
    updateField(input, 'email', '');

    await waitFor(() => {
      wrapper.update();
      const error = wrapper.find('div[data-error="email"]');

      expect(error.first().text()).toMatchInlineSnapshot(
        `"Please enter your email"`
      );
    });
  });

  it('should show "companyName" field validation error', async () => {
    const { wrapper } = setup();

    const input = wrapper.find('input[name="companyName"]');
    updateField(input, 'companyName', '');

    await waitFor(() => {
      wrapper.update();
      const error = wrapper.find('div[data-error="companyName"]');

      expect(error.first().text()).toMatchInlineSnapshot(
        `"Please enter the company name or click the box below the field"`
      );
    });
  });

  it('should call "onSignup" handler', async () => {
    const organizationId = '1aUDQfd91';
    const onSignup = jest.fn().mockResolvedValue({
      organizationId,
    });

    const { wrapper, props } = setup({ onSignup });
    fields.forEach(({ name, value }) => {
      const input = wrapper.find(`input[name="${name}"]`);
      updateField(input, name, value);
    });

    wrapper.find('button[type="button"]').simulate('click');

    await waitFor(() => {
      wrapper.update();
      expect(props.onSignup).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@keen.io',
        password: '$TrongPass4rd',
        companyName: 'Company',
        companyDisclaimer: false,
      });
    });
  });

  it('should call "onSuccess" handler', async () => {
    const organizationId = '2aaZfd91';
    const onSignup = jest.fn().mockResolvedValue({
      organizationId,
    });

    const { wrapper, props } = setup({ onSignup });
    fields.forEach(({ name, value }) => {
      const input = wrapper.find(`input[name="${name}"]`);
      updateField(input, name, value);
    });

    wrapper.find('button[type="button"]').simulate('click');

    await waitFor(() => {
      wrapper.update();
      expect(props.onSuccess).toHaveBeenCalledWith(organizationId, false);
    });
  });

  it('should show "email" categorized as spam error', async () => {
    const onSignup = jest.fn().mockRejectedValue({
      message: 'error',
      data: {
        errors: {
          email: 'SPAM',
        },
      },
    });

    const { wrapper } = setup({ onSignup });
    fields.forEach(({ name, value }) => {
      const input = wrapper.find(`input[name="${name}"]`);
      updateField(input, name, value);
    });

    wrapper.find('button[type="button"]').simulate('click');

    await waitFor(() => {
      wrapper.update();
      const error = wrapper.find('div[data-error="email"]');

      expect(error.first().text()).toMatchInlineSnapshot(
        `"Sorry, the email you have entered has been categorized as possible spam. Use a different email address, or contact us at team@keen.io"`
      );
    });
  });

  it('should call "onError" handler', async () => {
    const onSignup = jest.fn().mockRejectedValue({
      message: 'error',
    });

    const { wrapper, props } = setup({ onSignup });
    fields.forEach(({ name, value }) => {
      const input = wrapper.find(`input[name="${name}"]`);
      updateField(input, name, value);
    });

    wrapper.find('button[type="button"]').simulate('click');

    await waitFor(() => {
      wrapper.update();
      expect(props.onError).toHaveBeenCalledWith({
        message: 'error',
      });
    });
  });
});
