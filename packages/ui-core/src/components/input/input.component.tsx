import React, { FC } from 'react';

import { StyledInput, Suffix, Container } from './input.styles';

import { InputVariant } from './types';

export type Props = {
  /** Render error state indicator */
  hasError?: boolean;
  /** Input component variant */
  variant?: () => InputVariant;
  /** Icon render handler */
  renderIcon?: () => JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  hasError = false,
  variant = 'outline',
  renderIcon,
  ...props
}) => (
  <Container>
    <StyledInput
      hasError={hasError}
      variant={variant as InputVariant}
      {...props}
    />
    {renderIcon && <Suffix>{renderIcon()}</Suffix>}
  </Container>
);

export default Input;
