import React, { FC } from 'react';

import { StyledButton } from './more-button.styles';

type Props = {
  /** Disabled state */
  isDisabled?: boolean;
  /** Click event handler */
  onClick?: (e: React.SyntheticEvent) => void;
};

export const MoreButton: FC<Props> = ({ onClick, isDisabled = false }) => {
  return (
    <StyledButton
      data-testid="more-button"
      isDisabled={isDisabled}
      type="button"
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        !isDisabled && onClick && onClick(e)
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 30 30"
        width="30"
        height="30"
      >
        <defs />
        <circle cx="15" cy="8" r="2" fill="#fff" />
        <circle cx="15" cy="15" r="2" fill="#fff" />
        <circle cx="15" cy="22" r="2" fill="#fff" />
      </svg>
    </StyledButton>
  );
};

export default MoreButton;
