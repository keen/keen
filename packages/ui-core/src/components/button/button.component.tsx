import React, { FC } from 'react';

import { StyledButton, StyledAnchor, IconSocket } from './button.styles';

import { ButtonVariant } from './types';

type Props = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isDisabled?: boolean;
  href?: string;
  target?: string;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.SyntheticEvent) => void;
  icon?: JSX.Element;
};

export const Button: FC<Props> = ({
  /** Component React.Children nodes */
  children,
  /** Type of button */
  variant = 'primary',
  /** Click event handler */
  onClick,
  /** Anchor element href property */
  href,
  /** Anchor element target property */
  target = '_blank',
  /** Disabled state */
  isDisabled = false,
  /** HTML button element type */
  htmlType = 'button',
  /** Icon render handler */
  icon,
}) => {
  if (href) {
    return (
      <StyledAnchor
        isDisabled={isDisabled}
        variant={variant}
        href={href}
        target={target}
        onClick={(e: React.MouseEvent<HTMLElement>) =>
          !isDisabled && onClick && onClick(e)
        }
      >
        {children}
        {icon && <IconSocket>{icon}</IconSocket>}
      </StyledAnchor>
    );
  }

  return (
    <StyledButton
      isDisabled={isDisabled}
      type={htmlType}
      variant={variant}
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        !isDisabled && onClick && onClick(e)
      }
    >
      {children}
      {icon && <IconSocket>{icon}</IconSocket>}
    </StyledButton>
  );
};

export default Button;
