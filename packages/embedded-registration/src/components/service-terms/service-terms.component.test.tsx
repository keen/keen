import React from 'react';
import { render } from '@testing-library/react';

import ServiceTerms from './service-terms.component';
import text from './text.json';

test('renders "Terms of service" anchor', () => {
  const { getByText } = render(
    <ServiceTerms baseUrl={'baseUrl'} disclaimer="Register" />
  );
  const element = getByText(text.termsOfService);

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('href', 'baseUrl/tos');
});

test('renders "Privacy policy" anchor', () => {
  const { getByText } = render(
    <ServiceTerms baseUrl={'baseUrl'} disclaimer="Register" />
  );
  const element = getByText(text.privacyPolicy);

  expect(element).toBeInTheDocument();
  expect(element).toHaveAttribute('href', 'baseUrl/privacy-policy');
});
