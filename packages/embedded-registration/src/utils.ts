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

export const transformSignupResponse = ({
  organization_id,
}: SignupResponse) => ({
  organizationId: organization_id,
});
