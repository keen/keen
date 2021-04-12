import React, { forwardRef } from 'react';

import { StyledInput, Suffix, Prefix, Container } from './input.styles';

import { InputVariant } from './types';

export type Props = {
  /** Render error state indicator */
  hasError?: boolean;
  /** Input component variant */
  variant?: InputVariant;
  /** Custom border radius */
  borderRadius?: string;
  /** Render prefix elements handler */
  renderPrefix?: () => JSX.Element;
  /** Render suffix elements handler */
  renderSuffix?: () => JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef(
  (
    {
      hasError = false,
      variant = 'outline',
      borderRadius,
      renderPrefix,
      renderSuffix,
      ...props
    }: Props,
    ref: React.MutableRefObject<HTMLInputElement>
  ) => (
    <Container>
      <StyledInput
        ref={ref}
        hasError={hasError}
        hasPrefix={!!renderPrefix}
        hasSuffix={!!renderSuffix}
        variant={variant}
        borderRadius={borderRadius}
        {...props}
      />
      {renderPrefix && (
        <Prefix data-testid="input-prefix">{renderPrefix()}</Prefix>
      )}
      {renderSuffix && (
        <Suffix data-testid="input-suffix">{renderSuffix()}</Suffix>
      )}
    </Container>
  )
);

Input.displayName = 'Input';

export default Input;
