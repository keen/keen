import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Position } from '@keen.io/ui-core';

import { Gradient, Content, Block } from './button.styles';

import { Variant } from './types';

const gradientMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  variant: Variant;
  shadow: string;
  gradientTransmition: string;
  position: Position;
  disabled: boolean;
};

const Button: FC<Props> = ({
  children,
  position,
  variant,
  gradientTransmition,
  disabled,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const showGradient = hover && !disabled;

  return (
    <Block
      {...props}
      position={position}
      variant={variant}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Content>{children}</Content>
      <AnimatePresence>
        {showGradient && (
          <Gradient
            variant={variant}
            transmition={gradientTransmition}
            {...gradientMotion}
          />
        )}
      </AnimatePresence>
    </Block>
  );
};

export default Button;
