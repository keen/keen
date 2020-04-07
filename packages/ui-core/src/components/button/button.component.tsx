import React, { FC } from 'react';

import { StyledButton, StyledAnchor } from './button.styles';

import { ButtonVariant } from './types';

type Props = {
  children: React.ReactNode;
  type?: ButtonVariant;
  isDisabled?: boolean;
  href?: string;
  target?: string;
  onClick?: (e: React.SyntheticEvent) => void;
};

export const Button: FC<Props> = ({
  /** Component React.Children nodes */
  children,
  /** Type of button */
  type = 'primary',
  /** Click event handler */
  onClick,
  /** Anchor element href property */
  href,
  /** Anchor element target property */
  target = '_blank',
  /** Disabled state */
  isDisabled = false,
}) => {
  if (href) {
    return (
      <StyledAnchor
        isDisabled={isDisabled}
        variant={type}
        href={href}
        target={target}
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          !isDisabled && onClick(e)
        }
      >
        {children}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      isDisabled={isDisabled}
      variant={type}
      onClick={(e: React.MouseEvent<HTMLElement>) => !isDisabled && onClick(e)}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
