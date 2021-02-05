import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Icon } from '@keen.io/icons';

import {
  Container,
  TextWrapper,
  IconWrapper,
  TooltipMotion,
} from './badge.styles';

import { Variant } from './types';
import { truncate as truncateString } from '../../utils/string.utils';
import Tooltip from '../tooltip';

type Props = {
  variant?: Variant;
  children: React.ReactNode;
  removable?: boolean;
  onClick?: () => void;
  onRemove?: () => void;
  truncate?: boolean;
};

export const Badge: FC<Props> = ({
  children,
  variant = 'purple',
  removable,
  onClick,
  onRemove,
  truncate,
}) => {
  const [isActive, setActive] = useState(false);

  const tooltipMotion = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const label =
    truncate && typeof children === 'string'
      ? truncateString(children)
      : children;

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
        {label}
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
      {typeof label === 'string' && label.includes('...') && (
        <AnimatePresence>
          {isActive && (
            <TooltipMotion {...tooltipMotion}>
              <Tooltip arrowDirection="top">{children}</Tooltip>
            </TooltipMotion>
          )}
        </AnimatePresence>
      )}
    </Container>
  );
};

export default Badge;
