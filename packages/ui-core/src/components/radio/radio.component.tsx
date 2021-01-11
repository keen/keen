import React, { FC } from 'react';
import { AnimatePresence } from 'framer-motion';

import { Container, ActiveDot } from './radio.styles';
import { activeMotion } from './motion';

type Props = {
  /** On click handler */
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  /** Active indicator */
  isActive: boolean;
};

export const Radio: FC<Props> = ({ isActive, onClick }) => (
  <Container onClick={onClick} role="radio" aria-checked={isActive}>
    <AnimatePresence>
      {isActive && <ActiveDot data-testid="radio-active" {...activeMotion} />}
    </AnimatePresence>
  </Container>
);

export default Radio;
