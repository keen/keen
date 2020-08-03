import React, { FC } from 'react';

import { StyledButton, StyledIcon } from './action-button.styles';

import { ButtonAction } from './types';

type Props = {
  /** Action type */
  action: ButtonAction;
  /** Disabled state */
  isDisabled?: boolean;
  /** Custom styles for border-radius */
  borderRadius?: string;
  /** Remove background */
  disableBackground?: boolean;
  /** Click event handler */
  onClick?: (e: React.SyntheticEvent, type: ButtonAction) => void;
};

export const ActionButton: FC<Props> = ({
  onClick,
  isDisabled = false,
  action,
  borderRadius,
  disableBackground,
}) => {
  return (
    <StyledButton
      data-testid="action-button"
      isDisabled={isDisabled}
      borderRadius={borderRadius}
      disableBackground={disableBackground}
      type="button"
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        !isDisabled && onClick && onClick(e, action)
      }
    >
      <StyledIcon data-testid="action-icon" action={action}>
        {action === 'create' ? '+' : '×'}
      </StyledIcon>
    </StyledButton>
  );
};

export default ActionButton;
