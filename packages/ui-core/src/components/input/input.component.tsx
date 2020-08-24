import React, { forwardRef } from 'react';

import { StyledInput, Suffix, Container } from './input.styles';

import { InputVariant } from './types';

export type Props = {
  /** Render error state indicator */
  hasError?: boolean;
  /** Input component variant */
  variant?: InputVariant;
  /** Icon render handler */
  renderIcon?: () => JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    { hasError = false, variant = 'outline', renderIcon, ...props }: Props,
    ref: React.MutableRefObject<HTMLInputElement>
  ) => (
    <Container>
      <StyledInput
        ref={ref}
        hasError={hasError}
        variant={variant as InputVariant}
        {...props}
      />
      {renderIcon && <Suffix>{renderIcon()}</Suffix>}
    </Container>
  )
);

Input.displayName = 'Input';

export default Input;
