import React, { forwardRef } from 'react';

import { StyledInput, Suffix, Prefix, Container } from './input.styles';

import { InputVariant } from './types';

export type Props = {
  /** Render error state indicator */
  hasError?: boolean;
  /** Input component variant */
  variant?: InputVariant;
  /** Icon render handler  - @deprecated use renderSuffix instead */
  renderIcon?: () => JSX.Element;
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
      renderIcon,
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
        {...props}
      />
      {renderPrefix && (
        <Prefix data-testid="input-prefix">{renderPrefix()}</Prefix>
      )}
      {renderSuffix && (
        <Suffix data-testid="input-suffix">{renderSuffix()}</Suffix>
      )}
      {renderIcon && <Suffix>{renderIcon()}</Suffix>}
    </Container>
  )
);

Input.displayName = 'Input';

export default Input;
