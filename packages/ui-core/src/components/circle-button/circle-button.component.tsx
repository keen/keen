import React, { FC } from 'react';

import { StyledButton, IconSocket } from './circle-button.styles';

type Props = {
  /** Icon component */
  icon: JSX.Element;
  /** Disabled state */
  isDisabled?: boolean;
  /** Click event handler */
  onClick?: (e: React.SyntheticEvent) => void;
};

const CircleButton: FC<Props> = ({ icon, isDisabled = false, onClick }) => (
  <StyledButton
    data-testid="circle-button"
    isDisabled={isDisabled}
    type="button"
    onClick={(e: React.MouseEvent<HTMLElement>) =>
      !isDisabled && onClick && onClick(e)
    }
  >
    <IconSocket>{icon}</IconSocket>
  </StyledButton>
);

export default CircleButton;
