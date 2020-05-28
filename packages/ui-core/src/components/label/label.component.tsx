import React, { FC } from 'react';

import { StyledLabel } from './label.styles';

import { LabelVariant } from './types';

type Props = {
  /** Component children */
  children: React.ReactNode;
  /** Render error state indicator */
  hasError?: boolean;
  /** Render disable state indicator */
  disabled?: boolean;
  /** HTML input element reference */
  htmlFor?: string;
  /** Variant for label componet */
  variant?: LabelVariant;
};

export const Label: FC<Props> = ({
  htmlFor,
  hasError = false,
  disabled = false,
  variant = 'primary',
  children,
}) => (
  <StyledLabel
    hasError={hasError}
    variant={variant}
    disabled={disabled}
    htmlFor={htmlFor}
  >
    {children}
  </StyledLabel>
);

export default Label;
