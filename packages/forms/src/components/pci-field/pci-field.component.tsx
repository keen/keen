import React, { FC } from 'react';
import { Label, Error } from '@keen.io/ui-core';

import { Container, Input } from './pci-field.styles';

import ErrorContainer from '../error-container';

type Props = {
  /** HTML element identifier */
  id: string;
  /** Label text */
  label: string;
  /** React children nodes */
  children?: React.ReactNode;
  /** Error message */
  error?: string;
};

const PCIField: FC<Props> = ({ id, label, children, error }) => {
  const hasError = !!error;

  return (
    <Container>
      <Label hasError={hasError} htmlFor={id}>
        {label}
      </Label>
      {children}
      <Input id={id} hasError={hasError} />
      <ErrorContainer>
        {hasError && <Error data-error={id}>{error}</Error>}
      </ErrorContainer>
    </Container>
  );
};

export default PCIField;
