import React, { FC } from 'react';

import { StyledLabel, Asterisk } from './label.styles';

import { LabelVariant } from './types';

type Props = {
  /** Component children */
  children: React.ReactNode;
  /** Render error state indicator */
  hasError?: boolean;
  /** Render disable state indicator */
  disabled?: boolean;
  /** Renders asteriks indictor */
  showAsterisk?: boolean;
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
  showAsterisk,
  children,
}) => (
  <StyledLabel
    hasError={hasError}
    variant={variant}
    disabled={disabled}
    htmlFor={htmlFor}
  >
    <>
      {children}
      {showAsterisk && <Asterisk> *</Asterisk>}
    </>
  </StyledLabel>
);

export default Label;
