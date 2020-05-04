import React, { FC } from 'react';

import { Message } from './service-terms.styles';

type Props = {
  disclaimer: string;
  baseUrl: string;
};

export const ServiceTerms: FC<Props> = ({ baseUrl, disclaimer }) => (
  <Message>
    By clicking “{disclaimer}” I agree to the{' '}
    <a href={`${baseUrl}/tos`} target="_blank" rel="noopener noreferrer">
      Terms of Service
    </a>{' '}
    and{' '}
    <a
      href={`${baseUrl}/privacy-policy`}
      target="_blank"
      rel="noopener noreferrer"
    >
      Privacy Policy
    </a>
    .
  </Message>
);

export default ServiceTerms;
