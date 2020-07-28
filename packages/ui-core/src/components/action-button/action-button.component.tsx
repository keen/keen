import React, { FC } from 'react';

import { StyledButton, StyledIcon } from './action-button.styles';

import { ButtonAction } from './types';

type Props = {
  /** Action type */
  action: ButtonAction;
  /** Disabled state */
  isDisabled?: boolean;
  /** Click event handler */
  onClick?: (e: React.SyntheticEvent, type: ButtonAction) => void;
};

export const ActionButton: FC<Props> = ({
  onClick,
  isDisabled = false,
  action,
}) => {
  return (
    <StyledButton
      data-testid="action-button"
      isDisabled={isDisabled}
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
