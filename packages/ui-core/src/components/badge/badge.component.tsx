import React, { FC } from 'react';
import { colors } from '@keen.io/colors';
import { Icon } from '@keen.io/icons';

import { Container, TextWrapper, IconWrapper } from './badge.styles';

import { Variant } from './types';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  removable?: boolean;
  onClick?: () => void;
};

export const Badge: FC<Props> = ({
  children,
  variant = 'purple',
  removable,
  onClick,
}) => {
  const bgColor =
    variant === 'white' ? colors[variant][200] : colors[variant][100];
  const textColor = colors[variant][500];
  return (
    <Container>
      <TextWrapper
        bgColor={bgColor}
        textColor={textColor}
        removable={removable}
      >
        {children}
      </TextWrapper>
      {removable && (
        <IconWrapper
          bgColor={bgColor}
          onClick={onClick}
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
