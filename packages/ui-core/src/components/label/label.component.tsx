import React, { FC } from 'react';

import { StyledLabel } from './label.styles';

type Props = {
  /** Component children */
  children: React.ReactNode;
  /** Render error state indicator */
  hasError?: boolean;
  /** Render disable state indicator */
  disabled?: boolean;
  /** HTML input element reference */
  htmlFor?: string;
};

export const Label: FC<Props> = ({
  htmlFor,
  hasError = false,
  disabled = false,
  children,
}) => (
  <StyledLabel hasError={hasError} disabled={disabled} htmlFor={htmlFor}>
    {children}
  </StyledLabel>
);

export default Label;
