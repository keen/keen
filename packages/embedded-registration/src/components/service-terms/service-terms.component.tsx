import React, { FC } from 'react';

import { Message } from './service-terms.styles';
import text from './text.json';

type Props = {
  disclaimer: string;
  baseUrl: string;
};

export const ServiceTerms: FC<Props> = ({ baseUrl, disclaimer }) => (
  <Message>
    By clicking “{disclaimer}” I agree to the{' '}
    <a href={`${baseUrl}/tos`} target="_blank" rel="noopener noreferrer">
      {text.termsOfService}
    </a>{' '}
    and{' '}
    <a
      href={`${baseUrl}/privacy-policy`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text.privacyPolicy}
    </a>
    .
  </Message>
);

export default ServiceTerms;
