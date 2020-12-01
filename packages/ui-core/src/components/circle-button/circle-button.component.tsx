import React, { FC } from 'react';

import { StyledButton, IconSocket } from './circle-button.styles';

import { ButtonVariant } from '../../types';

type Props = {
  /** Icon component */
  icon: JSX.Element;
  /** Disabled state */
  isDisabled?: boolean;
  /** Click event handler */
  onClick?: (e: React.SyntheticEvent) => void;
  /** Type of button */
  variant?: ButtonVariant;
};

const CircleButton: FC<Props> = ({
  icon,
  isDisabled = false,
  onClick,
  variant = 'primary',
}) => (
  <StyledButton
    data-testid="circle-button"
    isDisabled={isDisabled}
    type="button"
    variant={variant}
    onClick={(e: React.MouseEvent<HTMLElement>) =>
      !isDisabled && onClick && onClick(e)
    }
  >
    <IconSocket>{icon}</IconSocket>
  </StyledButton>
);

export default CircleButton;
