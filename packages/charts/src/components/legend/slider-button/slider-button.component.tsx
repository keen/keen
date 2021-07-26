import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Position } from '@keen.io/ui-core';

import { Gradient, Content, Block } from './slider-button.styles';
import { gradientMotion } from './motion';

import { BUTTON_DIMENSION } from './constants';
import { Variant } from './types';

type Props = {
  /* Click event handler */
  onClick: () => void;
  /* React children nodes */
  children: React.ReactNode;
  /* Button variant */
  variant: Variant;
  /* Shadow definition */
  shadow: string;
  /* Gradient definition */
  gradientTransmition: string;
  /* Component position */
  position: Position;
  /* Disabled state */
  disabled: boolean;
  /* Main dimension */
  dimension?: number;
};

const Button: FC<Props> = ({
  children,
  position,
  variant,
  gradientTransmition,
  disabled,
  dimension = BUTTON_DIMENSION,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const showGradient = hover && !disabled;

  return (
    <Block
      {...props}
      position={position}
      variant={variant}
      dimension={dimension}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Content>{children}</Content>
      <AnimatePresence>
        {showGradient && (
          <Gradient
            variant={variant}
            dimension={dimension}
            transmition={gradientTransmition}
            {...gradientMotion}
          />
        )}
      </AnimatePresence>
    </Block>
  );
};

export default Button;
