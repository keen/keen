import React from 'react';
import { TOO_MANY_REQUESTS, CONFLICT, FORBIDDEN } from 'http-status-codes';

export const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case FORBIDDEN:
      return (
        <span>
          There is an another active user session in broswe. Please logout and
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
