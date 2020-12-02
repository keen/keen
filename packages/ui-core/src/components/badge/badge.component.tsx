import React, { FC } from 'react';
import { Icon } from '@keen.io/icons';

import { generateColors } from './utils';
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
  const { bgColor, textColor } = generateColors(variant);
  return (
    <Container>
      <TextWrapper
        bgColor={bgColor}
        textColor={textColor}
        removable={removable}
        onClick={onClick}
      >
        {children}
      </TextWrapper>
      {removable && (
        <IconWrapper
          bgColor={bgColor}
          onClick={onRemove}
          data-testid="badge-remove"
        >
          <Icon
            type="close"
            fill={textColor}
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
