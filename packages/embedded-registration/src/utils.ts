/* eslint-disable @typescript-eslint/camelcase */

import { FormValues, SignupResponse } from './types';

export const transformPayload = (
  formValues: FormValues,
  offerHandle: string
) => {
  const { firstName, lastName, password, email } = formValues;

  return {
    first_name: firstName,
    last_name: lastName,
    offer_handle: offerHandle,
    email,
    password,
  };
};

export const transformSignupResponse = (response: SignupResponse) => {
  if ('field_errors' in response) {
    const { field_errors } = response;
    return {
      errors: field_errors,
    };
  }

  const { organization_id } = response;
  return {
    organizationId: organization_id,
  };
};
