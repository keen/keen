import React, { FC } from 'react';

import { StyledInput, Suffix, Container } from './input.styles';

export type Props = {
  /** Render error state indicator */
  hasError?: boolean;
  /** Icon render handler */
  renderIcon?: () => JSX.Element;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  hasError = false,
  renderIcon,
  ...props
}) => (
  <Container>
    <StyledInput hasError={hasError} {...props} />
    {renderIcon && <Suffix>{renderIcon()}</Suffix>}
  </Container>
);

export default Input;
