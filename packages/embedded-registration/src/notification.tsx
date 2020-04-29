import React from 'react';
import { TOO_MANY_REQUESTS } from 'http-status-codes';

export const getErrorMessage = (statusCode: number) => {
  switch (statusCode) {
    case TOO_MANY_REQUESTS:
      return <span>Sorry, too many signups from your side.</span>;
    default:
      return <span>There is a problem with our systems.</span>;
  }
};
