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

export const transformOAuthPayload = (
  userToken: string,
  offerHandle: string
) => ({
  user_token: userToken,
  offer_handle: offerHandle,
});

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

export const setUtmCookie = (cookieList: string[]) => {
  let cookies: {
    [index: string]: string;
  } = {};

  cookieList.map(cookie => {
    const utmCookie = new URL(location.href).searchParams.get(cookie);
    if (utmCookie) {
      cookies = {
        ...cookies,
        [cookie]: utmCookie,
      };
    }
  });
  if (Object.entries(cookies).length) {
    const date = new Date();
    const hours = date.getHours();

    date.setHours(hours + 1);
    document.cookie = `keen=${JSON.stringify(
      cookies
    )}; expires=${date.toUTCString()}; domain=.keen.io`;
  }
};
