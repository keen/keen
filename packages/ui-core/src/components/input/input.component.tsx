import React, { FC } from 'react';

import { StyledInput } from './input.styles';

type Props = {
  /** Render error state indicator */
  hasError?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({ hasError = false, ...props }) => (
  <StyledInput hasError={hasError} {...props} />
);

export default Input;
