import React from 'react';
import { TOO_MANY_REQUESTS, CONFLICT, FORBIDDEN } from 'http-status-codes';

import { OAuthError } from './types';

export const getErrorMessage = (statusCode: number | OAuthError) => {
  switch (statusCode) {
    case OAuthError.OAUTH_401:
    case OAuthError.OAUTH_500:
      return (
        <span>
          There has been an authentication failure. Try again or register by
          using your email.
        </span>
      );
    case OAuthError.OAUTH_409:
      return (
        <span>
          User with this email already exists. Use different email or contact
          our support.
        </span>
      );
    case FORBIDDEN:
      return (
        <span>
          There is another active user session in the browser. Please logout and
          try again.
        </span>
      );
    case TOO_MANY_REQUESTS:
      return <span>Sorry, too many signups from your side.</span>;
    case CONFLICT:
      return <span>The user with that email already exist.</span>;
    default:
      return <span>There is a problem with our systems.</span>;
  }
};
