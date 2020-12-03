import React, { FC, useState } from 'react';
import { Icon } from '@keen.io/icons';

import { Container, TextWrapper, IconWrapper } from './badge.styles';

import { Variant } from './types';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
};

export const Badge: FC<Props> = ({
  children,
  variant = 'purple',
  removable,
  onClick,
  onRemove,
}) => {
  const [isActive, setActive] = useState(false);
  return (
    <Container
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <TextWrapper
        variant={variant}
        isActive={isActive}
        removable={removable}
        onClick={onClick}
      >
        {children}
      </TextWrapper>
      {removable && (
        <IconWrapper
          variant={variant}
          isActive={isActive}
          onClick={onRemove}
          data-testid="badge-remove"
        >
          <Icon
            type="close"
            fill="currentColor"
            opacity={0.5}
            width={8}
            height={8}
          />
        </IconWrapper>
      )}
    </Container>
  );
};

export default Badge;
